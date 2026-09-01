# ============================================================
# Resume generator for Mubarak Olanrewaju (portfolio resume).
# Content rules honored here:
#   - Purpose: reposition from web3-first to production frontend
#     developer (React, Angular, TypeScript). Facts only.
#   - Team framing (no "sole" claims, no inflated numbers).
#   - Zero em dashes / en dashes anywhere.
#   - Plain monochrome layout, like the original resume.
# Run:  python3 scripts/make_resume.py   (from the portfolio folder)
# ============================================================

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Fonts: Carlito (clean, modern sans) ──
FDIR = '/usr/share/fonts/truetype/english'
pdfmetrics.registerFont(TTFont('Carlito', f'{FDIR}/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', f'{FDIR}/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Italic', f'{FDIR}/Carlito-Italic.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-BoldItalic', f'{FDIR}/Carlito-BoldItalic.ttf'))
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold',
                   italic='Carlito-Italic', boldItalic='Carlito-BoldItalic')

# ── Palette: plain monochrome, no branding colors ──
INK = colors.HexColor('#111111')     # all text
RULE = colors.HexColor('#bbbbbb')    # thin section rules

# ── Tunables ──
BODY_SIZE = 10.2
BODY_LEAD = 13.0
SEC_BEFORE = 7
SEC_AFTER = 4
ENTRY_GAP = 2.5
BULLET_GAP = 0.5

name_style = ParagraphStyle(
    'Name', fontName='Carlito-Bold', fontSize=23, leading=26,
    alignment=TA_CENTER, textColor=INK, spaceAfter=1)

title_style = ParagraphStyle(
    'TitleLine', fontName='Carlito', fontSize=11.5, leading=14,
    alignment=TA_CENTER, textColor=INK, spaceAfter=3)

contact_style = ParagraphStyle(
    'Contact', fontName='Carlito', fontSize=10, leading=13.2,
    alignment=TA_CENTER, textColor=INK, spaceAfter=1)

section_style = ParagraphStyle(
    'Section', fontName='Carlito-Bold', fontSize=13, leading=15,
    spaceBefore=SEC_BEFORE, spaceAfter=SEC_AFTER, textColor=INK)

job_title_style = ParagraphStyle(
    'JobTitle', fontName='Carlito-Bold', fontSize=11, leading=14,
    textColor=INK, spaceBefore=1.5, spaceAfter=0.5)

job_meta_style = ParagraphStyle(
    'JobMeta', fontName='Carlito', fontSize=10, leading=12.8,
    textColor=INK, spaceAfter=2)

# One-line entry title: bold name + regular details on the same line.
oneline_style = ParagraphStyle(
    'OneLine', fontName='Carlito', fontSize=11, leading=14,
    textColor=INK, spaceBefore=1.5, spaceAfter=1.5)

bullet_style = ParagraphStyle(
    'Bullet', fontName='Carlito', fontSize=BODY_SIZE, leading=BODY_LEAD,
    leftIndent=13, firstLineIndent=-9, textColor=INK,
    spaceBefore=BULLET_GAP, spaceAfter=BULLET_GAP, alignment=TA_LEFT)

body_style = ParagraphStyle(
    'Body', fontName='Carlito', fontSize=BODY_SIZE, leading=BODY_LEAD,
    textColor=INK, spaceBefore=1, spaceAfter=1.5)

# ── Helpers ──

def section_flows(title):
    return [
        Paragraph(title, section_style),
        HRFlowable(width='100%', thickness=0.8, color=RULE,
                   spaceBefore=0, spaceAfter=6),
    ]

def entry_head(role, meta):
    """The title + meta lines of one entry (for KeepTogether gluing)."""
    head = [Paragraph(role, job_title_style)]
    if meta:
        head.append(Paragraph(meta, job_meta_style))
    return head

def bullets_flows(bullets):
    return [Paragraph(f'\u2022  {b}', bullet_style) for b in bullets]

def entry(role, meta, bullets):
    """Full entry; head + first bullet stay together across page breaks."""
    head = entry_head(role, meta)
    if not bullets:
        return [KeepTogether(head), Spacer(1, ENTRY_GAP)]
    flows = bullets_flows(bullets)
    out = [KeepTogether(head + flows[:1])]
    out.extend(flows[1:])
    out.append(Spacer(1, ENTRY_GAP))
    return out

def oneline_entry(name, details, bullets):
    """Project entry: bold name + details on one title line, then bullets."""
    title = Paragraph(f'<b>{name}</b>  |  {details}', oneline_style)
    flows = bullets_flows(bullets)
    out = [KeepTogether([title] + flows[:1])]
    out.extend(flows[1:])
    out.append(Spacer(1, ENTRY_GAP))
    return out

def glued_section(title, entry_flows):
    """Section header + the first entry's head + first bullet as ONE
    KeepTogether (no nesting), so headers never orphan at a page bottom.
    entry_flows is a list from entry()/oneline_entry(); its first element
    is a KeepTogether, so we rebuild it flat here."""
    first_kt = entry_flows[0]._content
    return ([KeepTogether(section_flows(title) + list(first_kt))]
            + entry_flows[1:])

# ── Build ──
doc = SimpleDocTemplate(
    'public/resume.pdf', pagesize=A4,
    leftMargin=1.2 * cm, rightMargin=1.2 * cm,
    topMargin=1.15 * cm, bottomMargin=1.15 * cm,
    title='Mubarak Olanrewaju - Frontend Developer Resume',
    author='Mubarak Olanrewaju', creator='Z.ai',
    subject='Frontend developer resume: React, Angular, TypeScript')

story = []

# Header
story.append(Paragraph('Mubarak Olanrewaju', name_style))
story.append(Paragraph('Frontend Developer', title_style))
story.append(Paragraph(
    'Lagos, Nigeria  |  olanrewajumubarak3@gmail.com  |  +234 906 846 0732',
    contact_style))
story.append(Paragraph(
    'linkedin.com/in/mubarak-olanrewaju  |  github.com/Freedteck',
    contact_style))

# Summary (positioning only; no project name-dropping)
story.extend(section_flows('SUMMARY'))
story.append(Paragraph(
    'Frontend developer with a strong foundation in JavaScript, TypeScript, '
    'React, and Angular, building production web applications for digital '
    'health, enterprise, and consumer products. Proven track record of leading '
    'teams and mentoring developers to deliver successful projects. Specialized '
    'in API integration, realtime features, and role-based access.', body_style))

# Experience
doorkita_exp = entry(
    'Frontend Developer',
    'Doorkita Technologies  |  Contract  |  Oct 2025 - Present',
    [
        'Frontend developer on a multi-tenant digital health platform (EHR, '
        'telemedicine, lab and pharmacy networks, insurance suite), working '
        'alongside a product designer, a backend developer and a mobile developer.',
        'Build and maintain the main clinical application (Angular, Angular '
        'Material, Sass) and the public React site at doorkita.com.',
        'Integrated dozens of REST APIs across clinical, lab, pharmacy and '
        'insurance workflows, with realtime WebSocket chat and video '
        'consultations on the Agora Video SDK.',
    ])
story.extend(glued_section('EXPERIENCE', doorkita_exp))

story.extend(entry(
    'Founder & Mentor',
    'LevelUp (developer community)  |  Part-time  |  Apr 2025 - Present  |  Lagos',
    [
        'Founded a community of aspiring developers and mentor them from '
        'fundamentals to shipping real projects.',
        'Led the build of the LevelUp learning platform with two community '
        'students; it is live, used by community students, and now run day to '
        'day by the two students.',
    ]))

story.extend(entry(
    'Frontend Developer',
    'Encentral Solutions Limited  |  Full-time  |  Jan 2025 - Dec 2025  |  Abuja',
    [
        'Built and maintained enterprise systems for Nigerian federal '
        'institutions with Angular and Angular Material: the NDIC Bank '
        'Liquidation Management System, the NSIA Procurement System and the '
        'NAQS Aquatic System.',
        'Delivered production-ready features through the full development '
        'lifecycle in a cross-functional team (frontend, backend, design, QA), '
        'one branch per feature, under strict documentation and architecture '
        'standards.',
        'Implemented warning messages and states across entire systems so users '
        'get clear, consistent feedback wherever they could go wrong.',
    ]))

story.extend(entry(
    'Frontend Developer Mentor',
    'Kodespot  |  Part-time  |  May 2024 - Present  |  Ilorin',
    [
        'Mentor students in frontend development from HTML and CSS fundamentals '
        'to advanced framework work and real-world projects.',
        'Keep the curriculum aligned with what the industry actually hires for.',
    ]))

story.extend(entry(
    'Frontend Developer Intern',
    'Encentral Solutions Limited  |  Jun 2024 - Nov 2024  |  Abuja',
    [
        'Built an employee management system with Angular and TypeScript on a '
        'five-developer team.',
        'Learned team-based workflows and version control through weekly '
        'assignments and real contributions.',
    ]))

story.extend(entry(
    'Frontend Developer Intern',
    'Softrays IT  |  Jun 2023 - Nov 2023  |  Ilorin',
    [
        'Trained intensively on frontend fundamentals and built small-scale '
        'projects with HTML, CSS and JavaScript.',
        'Applied UI/UX principles in wireframing and prototyping, and completed '
        'the Meta Frontend Developer course on Coursera.',
    ]))

# Projects: all six portfolio projects + the hackathon builds.
doorkita_proj = oneline_entry(
    'Doorkita (Digital Health Platform)',
    'doorkita.com  |  Oct 2025 - Present',
    [
        'A multi-tenant digital health platform connecting hospitals, clinics, '
        'labs, pharmacies, insurers and patients, covering the EHR, telemedicine, '
        'lab and pharmacy networks, and an insurance suite.',
        'Built role-based access and routing across 7+ user types, realtime '
        'provider-patient chat, and video consultations on the main Angular '
        'clinical application.',
    ])
story.extend(glued_section('PROJECTS', doorkita_proj))

story.extend(oneline_entry(
    'Kostody (Phone Repair Trust Platform)',
    'kostody.vercel.app  |  Launched 2026',
    [
        'A phone repair platform that turns every repair into a locked, '
        'tamper-proof record both sides can trust: time-stamped condition '
        'photos, PIN-locked quotes, and a live shared record.',
        'Designed the product and built the React apps and the backend on '
        'Prisma and Supabase (PostgreSQL), with the customer PIN stored '
        'scrambled. Live with its first repair engineer.',
    ]))

story.extend(oneline_entry(
    'LevelUp (AI personalized Learning Management System)',
    'levelup-curriculum.vercel.app  |  Apr 2025 - Present',
    [
        'AI-driven learning platform that generates a personal course catalog '
        'per student, with adaptive assessments, AI feedback, and XP, levels '
        'and token rewards.',
        'Built with two community students: React frontend, Express backend on '
        'Supabase, and the AI generation layer on Google Gemini and Groq.',
    ]))

story.extend(entry(
    'NDIC BLMS (Bank Liquidation Management System)',
    'Encentral Solutions Limited',
    [
        'Collaborated with a cross-functional team of developers to build the '
        'frontend of the bank liquidation management system of the Nigeria '
        'Deposit Insurance Corporation, using Angular and Angular Material.',
        'Contributed to the development of complex, responsive user interfaces '
        'for managing critical financial liquidation data, with backend API '
        'integration.',
        'Implemented warning messages and states across the whole system so '
        'human errors are caught clearly and consistently.',
    ]))

story.extend(entry(
    'NSIA Procurement System',
    'Encentral Solutions Limited',
    [
        'Maintained and applied updates to the production procurement '
        'management system.',
        'Collaborated with cross-functional teams to implement new features '
        'and resolve system issues.',
        'Ensured system reliability and optimal performance for end users.',
    ]))

story.extend(entry(
    'NAQS Aquatic System',
    'Encentral Solutions Limited',
    [
        'Implemented system updates and feature improvements based on user '
        'requirements.',
        'Collaborated with backend and QA teams to ensure seamless system '
        'functionality.',
        'Optimized system performance through regular maintenance and code '
        'reviews.',
    ]))

story.extend(entry(
    'Web3 hackathon builds  |  github.com/Freedteck',
    '',
    [
        'Vurso (Angelhack X Hedera): on-chain developer Q&amp;A platform with '
        'token tipping and bounty questions.',
        'Vibetrax (Angelhack X Moveathon): music NFT platform on IOTA with '
        'Move smart contracts and NFT minting for artists.',
        'Propatradex (Angelhack X Moveathon): real estate platform on IOTA '
        'with blockchain features in traditional property workflows.',
        'Event Pass (Encode Club): NFT attendance passes on Solana with QR '
        'ownership verification and token-gated dashboards.',
    ]))

# Education
story.extend(section_flows('EDUCATION'))
story.append(KeepTogether(entry_head(
    'Bachelor of Engineering in Computer Engineering',
    'University of Ilorin  |  Ilorin, Nigeria  |  2024')))

# Skills: restored from the original resume
story.extend(section_flows('SKILLS'))
skills = [
    ('Core Skills', 'HTML, CSS, JavaScript, TypeScript, React, CSS Modules, '
     'Tailwind CSS'),
    ('Additional Skills', 'Angular, Next.js, SASS, Kotlin'),
    ('Tools', 'Git, GitHub'),
    ('Blockchain Technologies', 'dApp Development, Web3 Integration, Smart '
     'Contract Integration'),
    ('UI/UX Design', 'Wireframing, Prototyping'),
    ('CMS &amp; SEO', 'WordPress, SEO'),
    ('Soft Skills', 'Leadership, Mentorship, Collaboration, Adaptability, '
     'Communication, Problem-solving'),
]
for label, vals in skills:
    story.append(Paragraph(f'<b>{label}:</b>  {vals}', body_style))

doc.build(story)
print('resume.pdf written to public/resume.pdf')
