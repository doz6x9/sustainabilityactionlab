import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Handshake,
  LayoutDashboard,
  ListChecks,
  Mail,
  MapPin,
  Medal,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sprout,
  Star,
  Target,
  Trophy,
  Upload,
  Users,
  X
} from "lucide-react";

const logoUrl = "https://ktk.pte.hu/sites/ktk.pte.hu/files/images/logo/logo-en.png";
const assetBase = import.meta.env.BASE_URL;

const images = {
  heroStudents: `${assetBase}images/upfbe-students-hallway.jpg`,
  biodiversity: `${assetBase}images/biodiversity-mapping-award.jpg`,
  sdg: "https://ktk.pte.hu/sites/ktk.pte.hu/files/images/sdg_en.png",
  seminar:
    "https://ktk.pte.hu/sites/ktk.pte.hu/files/styles/node_1200/public/images/news/2025/05/20250507-dsc_2827.jpg?itok=0vaGLhDv",
  practical:
    "https://ktk.pte.hu/sites/ktk.pte.hu/files/styles/node_1200/public/images/blog/2026/04/university-of-pecs-practical-learning-2.jpg?itok=Cz5jK-uZ",
  international: "https://ktk.pte.hu/sites/ktk.pte.hu/files/uploads/international.JPG",
  campus:
    "https://ktk.pte.hu/sites/ktk.pte.hu/files/styles/node_1200/public/images/kepgaleria/2025/05/1-3-1.png?itok=OnZxJMae"
};

const levels = [
  { step: 1, name: "Green Starter", hours: "5 hrs", points: "50 pts" },
  { step: 2, name: "Impact Builder", hours: "15 hrs", points: "150 pts" },
  { step: 3, name: "Champion", hours: "30 hrs", points: "280 pts" },
  { step: 4, name: "Hero", hours: "50 hrs", points: "450 pts" },
  { step: 5, name: "Leader", hours: "75 hrs", points: "700 pts" }
];

const leaderboard = [
  { initials: "A", name: "Anna K.", points: 420, tag: "Leader" },
  { initials: "M", name: "Mark D.", points: 360, tag: "Hero" },
  { initials: "N", name: "Nushrat A.", points: 295, tag: "Champion" },
  { initials: "B", name: "Bence R.", points: 260, tag: "Champion" }
];

const projectCards = [
  {
    title: "Recycling Awareness Campaign",
    partner: "Green Pécs NGO",
    category: "Communication",
    type: "communication",
    date: "June 12",
    points: 60,
    spots: 8,
    image: images.seminar
  },
  {
    title: "Campus Biodiversity Mapping",
    partner: "Sustainability Centre",
    category: "Research",
    type: "research",
    date: "June 18",
    points: 85,
    spots: 12,
    image: images.biodiversity
  },
  {
    title: "Community Food Rescue Shift",
    partner: "Local Social Kitchen",
    category: "Operations",
    type: "operations",
    date: "June 24",
    points: 75,
    spots: 6,
    image: images.international
  },
  {
    title: "Responsible Business Workshop",
    partner: "UPFBE Faculty Team",
    category: "Communication",
    type: "communication",
    date: "July 3",
    points: 55,
    spots: 10,
    image: images.heroStudents
  }
];

const recognitionRows = [
  ["Volunteer hours", "1 hour approved by a partner NGO", "10 points"],
  ["Reflection note", "Short learning reflection after an activity", "20 points"],
  ["Project lead role", "Coordinate a student team or event station", "80 points"],
  ["Evidence quality", "Clear photo, post, link, or attendance proof", "Award review"]
];

const gallery = [
  {
    src: images.seminar,
    title: "Applied learning with faculty mentors",
    body: "Students connect classroom work with sustainability practice."
  },
  {
    src: images.international,
    title: "International student community",
    body: "The Lab welcomes English-language and Hungarian-language participants."
  },
  {
    src: images.heroStudents,
    title: "Faculty conversations in action",
    body: "Students work directly with faculty and partners around practical sustainability questions."
  }
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-black uppercase text-green">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-deep md:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-slate-600">{body}</p> : null}
    </div>
  );
}

function Header({ activePortalTab, setActivePortalTab }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId = 0;

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 90 || currentScrollY < lastScrollY - 8) {
          setHidden(false);
        } else if (currentScrollY > lastScrollY + 8 && !menuOpen) {
          setHidden(true);
        }

        lastScrollY = currentScrollY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  const goToSubmit = () => {
    setActivePortalTab("submit");
    setMenuOpen(false);
    setTimeout(() => scrollToSection("student-hub"), 0);
  };

  const navLinks = [
    ["Centre", "centre"],
    ["Student Hub", "student-hub"],
    ["Projects", "projects"],
    ["Recognition", "recognition"],
    ["Partners", "partners"]
  ];

  const visible = !hidden || hovering || menuOpen;

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-50 h-4"
        aria-hidden="true"
        onMouseEnter={() => setHovering(true)}
      />
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-[#2f6bc5] bg-[#2f6bc5] text-white shadow-calm transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3"
        aria-label="Primary navigation"
      >
        <a className="flex min-w-0 items-center gap-3" href="#top" aria-label="Sustainability Action Lab home">
          <span className="flex h-14 w-56 shrink-0 items-center justify-start overflow-hidden px-0">
            <img
              className="max-h-12 w-auto object-contain"
              src={logoUrl}
              alt="University of Pécs Faculty of Business and Economics"
            />
          </span>
          <span className="hidden min-w-0 xl:block">
            <span className="block text-sm font-black text-white">Sustainability Action Lab</span>
            <span className="block text-xs font-semibold text-white/75">University of Pécs Sustainability Centre</span>
          </span>
        </a>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white lg:hidden"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="siteNav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          <span className="sr-only">Toggle menu</span>
        </button>

        <div
          id="siteNav"
          className={`absolute left-4 right-4 top-[74px] rounded-lg border border-white/20 bg-[#2f6bc5] p-3 shadow-soft lg:static lg:flex lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            menuOpen ? "block" : "hidden lg:flex"
          }`}
        >
          {navLinks.map(([label, target]) => (
            <a
              key={target}
              className="block rounded-md px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/10 hover:text-white"
              href={`#${target}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <button
            className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-black lg:mt-0 lg:w-auto ${
              activePortalTab === "submit" ? "bg-white text-[#2f6bc5]" : "bg-white/10 text-white hover:bg-white/20"
            }`}
            type="button"
            onClick={goToSubmit}
          >
            <Clock size={16} aria-hidden="true" />
            Submit Hours
          </button>
        </div>
      </nav>
      </header>
    </>
  );
}

function Hero({ setActivePortalTab }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line bg-ink text-white">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={images.heroStudents}
        alt="University of Pécs students speaking with faculty"
      />
      <div className="absolute inset-0 bg-[#12365f]/75" />
      <div className="relative mx-auto grid min-h-[740px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_0.95fr] lg:py-20">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-black text-white shadow-calm">
            <Sprout size={16} aria-hidden="true" />
            Faculty sustainability project hub
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-none text-white md:text-6xl">
            Volunteer, track your impact, and compete to become a Sustainability Leader.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90">
            A central digital hub where Business Faculty students join partner projects, submit volunteer hours, earn
            points, unlock recognition levels, follow events, read lab updates, and build real community impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-black text-deep shadow-calm hover:bg-mist"
              type="button"
              onClick={() => {
                setActivePortalTab("submit");
                scrollToSection("student-hub");
              }}
            >
              <Users size={18} aria-hidden="true" />
              Join as Student
            </button>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/50 bg-white/10 px-5 py-3 font-black text-white hover:bg-white/20"
              href="#partners"
            >
              <Handshake size={18} aria-hidden="true" />
              Partner as NGO
            </a>
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-green px-5 py-3 font-black text-white shadow-calm hover:bg-[#185a42]"
              type="button"
              onClick={() => {
                setActivePortalTab("leaderboard");
                scrollToSection("student-hub");
              }}
            >
              <Trophy size={18} aria-hidden="true" />
              View Leaderboard
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-white/25 bg-white/90 shadow-calm">
            <img
              className="h-44 w-full object-contain p-4"
              src={images.sdg}
              alt="United Nations Sustainable Development Goals"
            />
          </div>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="rounded-lg bg-deep px-6 py-7 text-white">
        <p className="text-2xl font-black">Student Impact Dashboard</p>
        <p className="mt-3 text-sm leading-6 text-white/90">
          Track hours, points, level progress, and upcoming NGO tasks.
        </p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["32", "Hours logged", Clock],
          ["295", "Total points", BarChart3],
          ["#4", "Leaderboard", Trophy]
        ].map(([value, label, Icon]) => (
          <div key={label} className="rounded-lg border border-line bg-paper p-4">
            <Icon className="mb-4 text-green" size={20} aria-hidden="true" />
            <p className="text-2xl font-black text-deep">{value}</p>
            <p className="mt-2 text-xs font-bold text-slate-600">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-green/20 bg-mist p-4">
        <div className="flex items-center justify-between gap-4 text-xs font-black text-deep">
          <span>Sustainability Champion</span>
          <span>32/50 hrs to Hero</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
          <div className="h-full w-[64%] rounded-full bg-green" />
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-line">
        <div className="border-b border-line px-4 py-3">
          <p className="font-black text-deep">Top Sustainability Leaders</p>
        </div>
        {leaderboard.slice(0, 3).map((student) => (
          <div
            key={student.name}
            className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-sm font-black text-green">
                {student.initials}
              </span>
              <div>
                <p className="font-black text-ink">{student.name}</p>
                <p className="text-xs text-slate-600">{student.points} points</p>
              </div>
            </div>
            <span className="rounded-full bg-[#f7e7b6] px-3 py-1 text-xs font-black text-[#76570c]">
              {student.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCards() {
  const features = [
    {
      icon: Users,
      title: "Student participation",
      body: "Students find verified opportunities, register interest, submit evidence, and see what is waiting for approval."
    },
    {
      icon: Handshake,
      title: "Partner projects",
      body: "NGOs and faculty teams can present focused briefs with skills needed, dates, places, points, and open seats."
    },
    {
      icon: Trophy,
      title: "Recognition engine",
      body: "Approved hours convert into points, levels, badges, award eligibility, and a visible leaderboard."
    },
    {
      icon: FileText,
      title: "Impact evidence",
      body: "Each activity includes proof links, reflection notes, partner feedback state, and a clear review trail."
    }
  ];

  return (
    <section id="centre" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Centre workflow"
          title="Built around the real student journey"
          body="The Lab gives students one place to move from discovery to contribution, recognition, and reflection."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-lg border border-line bg-paper p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-deep text-white">
                <Icon size={21} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-black text-deep">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudentPortal({ activePortalTab, setActivePortalTab }) {
  const [submitMessage, setSubmitMessage] = useState("");

  const submitHours = (event) => {
    event.preventDefault();
    setSubmitMessage("Your hours are ready for Sustainability Centre review.");
  };

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "submit", label: "Submit Hours", icon: Clock },
    { key: "leaderboard", label: "Leaderboard", icon: Trophy },
    { key: "level", label: "My Level", icon: Sprout },
    { key: "projects", label: "NGO Projects", icon: Handshake },
    { key: "calendar", label: "Calendar", icon: CalendarDays },
    { key: "reflections", label: "Reflections", icon: FileText },
    { key: "awards", label: "Awards", icon: Medal }
  ];

  return (
    <section id="student-hub" className="border-y border-line bg-paper py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Student hub"
          title="Submit work, follow status, and climb the recognition pathway"
          body="The student area keeps everyday tasks close together: projects, hours, points, badges, awards, and reflection."
        />

        <div className="grid gap-5 rounded-lg border border-line bg-white p-4 shadow-soft lg:grid-cols-[260px_1fr]">
          <aside className="rounded-lg border border-line bg-paper p-3">
            <nav className="grid gap-2" aria-label="Student portal tabs">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  className={`flex min-h-12 items-center gap-3 rounded-md px-4 text-left text-sm font-black ${
                    activePortalTab === key ? "bg-deep text-white" : "text-slate-700 hover:bg-mist hover:text-deep"
                  }`}
                  onClick={() => setActivePortalTab(key)}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-h-[520px]">
            {activePortalTab === "dashboard" && <PortalDashboard />}
            {activePortalTab === "submit" && <SubmitHoursForm onSubmit={submitHours} message={submitMessage} />}
            {activePortalTab === "leaderboard" && <LeaderboardPanel />}
            {activePortalTab === "level" && <LevelPanel />}
            {activePortalTab === "projects" && <ProjectPanel />}
            {activePortalTab === "calendar" && <CalendarPanel />}
            {activePortalTab === "reflections" && <ReflectionsPanel />}
            {activePortalTab === "awards" && <AwardsPanel />}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalDashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div className="rounded-lg border border-line p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-green">Current progress</p>
            <h3 className="mt-2 text-2xl font-black text-deep">Nushrat A. is 18 hours from Sustainability Hero</h3>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-black text-green">
            <CheckCircle size={16} aria-hidden="true" />
            Champion level
          </span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["32", "Hours logged"],
            ["295", "Points"],
            ["4", "Open tasks"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-line bg-paper p-5">
              <p className="text-3xl font-black text-deep">{value}</p>
              <p className="mt-2 text-sm font-bold text-slate-600">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-line bg-mist p-5">
          <div className="flex items-center justify-between text-sm font-black text-deep">
            <span>Hero pathway</span>
            <span>64%</span>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[64%] rounded-full bg-green" />
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            ["Evidence accepted", ShieldCheck],
            ["Reflection written", FileText],
            ["Partner feedback pending", Clock]
          ].map(([label, Icon]) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border border-line p-4">
              <Icon className="text-green" size={20} aria-hidden="true" />
              <span className="text-sm font-black text-deep">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <CurrentGoalCard />
    </div>
  );
}

function CurrentGoalCard() {
  return (
    <aside className="flex min-h-[420px] flex-col rounded-lg bg-deep p-6 text-white">
      <Target size={28} aria-hidden="true" />
      <h3 className="mt-5 text-2xl font-black">Current Goal: Sustainability Hero</h3>
      <p className="mt-4 leading-7 text-white/90">
        You need 18 more hours and positive NGO feedback to unlock the next level.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {["32 hours logged", "295 points", "NGO feedback pending"].map((item) => (
          <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-black">
            <CheckCircle size={14} aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
      <div className="mt-auto border-t border-white/25 pt-5">
        <p className="text-sm font-black">Next suggested action</p>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Join a research or operations project worth at least 75 points.
        </p>
      </div>
    </aside>
  );
}

function SubmitHoursForm({ onSubmit, message }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <form className="rounded-lg border border-line p-5" onSubmit={onSubmit}>
        <h3 className="text-xl font-black text-deep">Submit Volunteer Hours</h3>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-600">
            NGO / Project
            <select className="min-h-12 rounded-md border border-line bg-white px-4 font-medium text-ink">
              <option>Green Pécs NGO — Recycling Awareness Campaign</option>
              <option>Sustainability Centre — Campus Biodiversity Mapping</option>
              <option>Local Social Kitchen — Community Food Rescue Shift</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-600">
            Date
            <input className="min-h-12 rounded-md border border-line px-4 font-medium text-ink" type="date" defaultValue="2026-06-03" />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-600">
            Hours completed
            <input className="min-h-12 rounded-md border border-line px-4 font-medium text-ink" type="number" min="1" defaultValue="3" />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-600">
            What did you do?
            <textarea
              className="min-h-28 rounded-md border border-line px-4 py-3 font-medium text-ink"
              defaultValue="Created Instagram posts and helped prepare the NGO campaign content calendar."
            />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-600">
            Evidence link / photo upload
            <input
              className="min-h-12 rounded-md border border-line px-4 font-medium text-ink"
              placeholder="Paste Drive link, post link, or upload proof"
            />
          </label>
          <button
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md bg-deep px-5 py-3 font-black text-white shadow-calm hover:bg-ink"
            type="submit"
          >
            <Upload size={18} aria-hidden="true" />
            Submit for Approval
          </button>
          {message ? (
            <p className="rounded-md border border-green/30 bg-mist px-4 py-3 text-sm font-black text-green" role="status">
              {message}
            </p>
          ) : null}
        </div>
      </form>
      <CurrentGoalCard />
    </div>
  );
}

function LeaderboardPanel() {
  return (
    <div className="rounded-lg border border-line p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase text-green">Recognition race</p>
          <h3 className="mt-2 text-2xl font-black text-deep">Top Sustainability Leaders</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e7b6] px-4 py-2 text-sm font-black text-[#76570c]">
          <Trophy size={16} aria-hidden="true" />
          Monthly award window
        </span>
      </div>
      <div className="mt-6 divide-y divide-line rounded-lg border border-line">
        {leaderboard.map((student, index) => (
          <div key={student.name} className="grid gap-4 p-4 sm:grid-cols-[48px_1fr_140px_120px] sm:items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-deep text-lg font-black text-white">
              {index + 1}
            </span>
            <div>
              <p className="font-black text-ink">{student.name}</p>
              <p className="text-sm text-slate-600">Verified volunteer work and reflection complete</p>
            </div>
            <p className="font-black text-deep">{student.points} points</p>
            <span className="w-fit rounded-full bg-mist px-3 py-1 text-xs font-black text-green">{student.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LevelPanel() {
  return (
    <div className="rounded-lg border border-line p-5">
      <h3 className="text-2xl font-black text-deep">Level pathway</h3>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">
        Levels combine approved hours, points, partner feedback, and reflection quality.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {levels.map((level, index) => (
          <div
            key={level.name}
            className={`rounded-lg border p-4 text-center ${index === 2 ? "border-gold bg-[#fff9e9]" : "border-line bg-paper"}`}
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green text-lg font-black text-white">
              {level.step}
            </span>
            <p className="mt-4 font-black text-deep">{level.name}</p>
            <p className="mt-2 text-sm font-bold text-slate-600">{level.hours}</p>
            <p className="text-sm text-slate-500">{level.points}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {["Verified activity evidence", "Reflection accepted", "Partner feedback received"].map((rule) => (
          <div key={rule} className="flex items-center gap-3 rounded-lg border border-line p-4">
            <ListChecks className="text-green" size={20} aria-hidden="true" />
            <span className="text-sm font-black text-deep">{rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectPanel() {
  return (
    <div className="rounded-lg border border-line p-5">
      <h3 className="text-2xl font-black text-deep">Recommended NGO projects</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {projectCards.slice(0, 2).map((project) => (
          <article key={project.title} className="rounded-lg border border-line bg-paper p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-green">{project.partner}</p>
                <h4 className="mt-2 text-lg font-black text-deep">{project.title}</h4>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-deep">{project.points} pts</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Seats open: {project.spots}. Next activity: {project.date}.
            </p>
            <button
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-deep px-4 py-2.5 text-sm font-black text-white hover:bg-ink"
              type="button"
            >
              Register Interest
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function CalendarPanel() {
  const events = [
    ["June 12", "Recycling campaign briefing", "Green Pécs NGO"],
    ["June 18", "Campus biodiversity field walk", "Sustainability Centre"],
    ["June 24", "Food rescue evening shift", "Local Social Kitchen"],
    ["July 3", "Responsible business workshop", "UPFBE Faculty Team"]
  ];

  return (
    <div className="rounded-lg border border-line p-5">
      <h3 className="text-2xl font-black text-deep">Upcoming activities</h3>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">
        The calendar keeps volunteer shifts, briefings, and award deadlines in one place.
      </p>
      <div className="mt-6 divide-y divide-line rounded-lg border border-line">
        {events.map(([date, title, partner]) => (
          <article key={title} className="grid gap-4 p-4 md:grid-cols-[110px_1fr_190px] md:items-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mist px-3 py-1 text-sm font-black text-green">
              <CalendarDays size={15} aria-hidden="true" />
              {date}
            </span>
            <div>
              <h4 className="font-black text-deep">{title}</h4>
              <p className="mt-1 text-sm text-slate-600">{partner}</p>
            </div>
            <button className="inline-flex w-fit items-center gap-2 rounded-md bg-deep px-4 py-2.5 text-sm font-black text-white hover:bg-ink" type="button">
              Add to Planner
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ReflectionsPanel() {
  const [reflectionMessage, setReflectionMessage] = useState("");

  return (
    <form
      className="rounded-lg border border-line p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setReflectionMessage("Your reflection is attached to the activity record.");
      }}
    >
      <h3 className="text-2xl font-black text-deep">Reflection journal</h3>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">
        Short reflections help the Centre connect volunteer work with applied learning outcomes.
      </p>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-black text-slate-600">
          Activity
          <select className="min-h-12 rounded-md border border-line bg-white px-4 font-medium text-ink">
            <option>Recycling Awareness Campaign</option>
            <option>Campus Biodiversity Mapping</option>
            <option>Responsible Business Workshop</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-600">
          Reflection
          <textarea
            className="min-h-36 rounded-md border border-line px-4 py-3 font-medium text-ink"
            placeholder="What changed in your thinking, skills, or understanding of local sustainability work?"
          />
        </label>
        <button
          className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md bg-deep px-5 py-3 font-black text-white shadow-calm hover:bg-ink"
          type="submit"
        >
          <FileText size={18} aria-hidden="true" />
          Save Reflection
        </button>
        {reflectionMessage ? (
          <p className="rounded-md border border-green/30 bg-mist px-4 py-3 text-sm font-black text-green" role="status">
            {reflectionMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function AwardsPanel() {
  const badges = [
    ["Reliable Volunteer", "3 approved activities", CheckCircle],
    ["Project Communicator", "2 campaign tasks", FileText],
    ["Community Builder", "Partner feedback received", Users],
    ["Sustainability Medal", "Champion level reached", Medal]
  ];

  return (
    <div className="rounded-lg border border-line p-5">
      <h3 className="text-2xl font-black text-deep">Badges and award eligibility</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {badges.map(([name, detail, Icon]) => (
          <article key={name} className="flex gap-4 rounded-lg border border-line bg-paper p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gold text-ink">
              <Icon size={22} aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-black text-deep">{name}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-green/20 bg-mist p-5">
        <p className="font-black text-deep">Award eligibility</p>
        <p className="mt-2 leading-7 text-slate-700">
          Eligible students show balanced participation: approved hours, evidence quality, reflection, and partner
          feedback.
        </p>
      </div>
    </div>
  );
}

function RecognitionTables() {
  return (
    <section id="recognition" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Gamification"
          title="Clear rules for points, badges, and recognition"
          body="The scoring model rewards useful work, not just attendance. Students can see exactly what moves them forward."
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full min-w-[620px] text-left">
              <thead className="bg-deep text-white">
                <tr>
                  <th className="px-5 py-4 text-sm font-black">Action</th>
                  <th className="px-5 py-4 text-sm font-black">Requirement</th>
                  <th className="px-5 py-4 text-sm font-black">Recognition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {recognitionRows.map(([action, requirement, points]) => (
                  <tr key={action}>
                    <td className="px-5 py-4 font-black text-deep">{action}</td>
                    <td className="px-5 py-4 text-sm leading-6 text-slate-600">{requirement}</td>
                    <td className="px-5 py-4 text-sm font-black text-green">{points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg border border-line bg-paper p-6">
            <div className="flex items-center gap-3">
              <Award className="text-gold" size={30} aria-hidden="true" />
              <h3 className="text-2xl font-black text-deep">Recognition pathway</h3>
            </div>
            <div className="mt-6 grid gap-3">
              {levels.map((level) => (
                <div key={level.name} className="flex items-center justify-between gap-4 rounded-lg border border-line bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-sm font-black text-green">
                      {level.step}
                    </span>
                    <p className="font-black text-deep">{level.name}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-600">{level.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectBoard() {
  const [filter, setFilter] = useState("all");
  const filters = [
    ["all", "All"],
    ["communication", "Communication"],
    ["operations", "Operations"],
    ["research", "Research"]
  ];
  const filteredProjects = useMemo(
    () => (filter === "all" ? projectCards : projectCards.filter((project) => project.type === filter)),
    [filter]
  );

  return (
    <section id="projects" className="border-y border-line bg-paper py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Project board"
          title="Opportunities ready for student teams"
          body="Students can browse partner briefs by work type and choose activities that match their skills and schedule."
        />
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Project filters">
            {filters.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-black ${
                  filter === key ? "border-deep bg-deep text-white" : "border-line bg-white text-deep hover:bg-mist"
                }`}
                onClick={() => setFilter(key)}
              >
                <Search size={15} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <p className="text-sm font-bold text-slate-600">{filteredProjects.length} active briefs</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-lg border border-line bg-white shadow-calm">
              <img className="h-44 w-full object-cover" src={project.image} alt={`${project.title} activity`} />
              <div className="p-5">
                <p className="text-xs font-black uppercase text-green">{project.category}</p>
                <h3 className="mt-2 text-lg font-black leading-6 text-deep">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{project.partner}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-black text-green">{project.points} points</span>
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-black text-slate-700">{project.spots} seats</span>
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-black text-slate-700">{project.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudentGallery() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Student life"
          title="Sustainability work belongs inside the faculty experience"
          body="The Lab pairs formal learning with student-led service, public evidence, and partner-facing outcomes."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-lg border border-line bg-paper">
              <img className="h-64 w-full object-cover" src={item.src} alt={item.title} />
              <div className="p-5">
                <h3 className="font-black text-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerAdmin() {
  return (
    <section id="partners" className="border-y border-line bg-paper py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Partners"
          title="A practical operating layer for NGOs and faculty coordinators"
          body="Partner teams can shape briefs, review evidence, and keep students focused on meaningful work."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            [Building2, "Partner onboarding", "Create clear briefs with location, time, skills, proof requirements, and student capacity."],
            [BookOpen, "Faculty oversight", "Coordinate approval state, reflection quality, and recognition decisions in one workflow."],
            [BarChart3, "Impact reporting", "Track hours, tasks completed, partner feedback, and student progression by month."]
          ].map(([Icon, title, body]) => (
            <article key={title} className="rounded-lg border border-line bg-white p-6">
              <Icon className="text-green" size={28} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-black text-deep">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-line bg-white p-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Pending approvals", "12", Clock],
              ["Active partner briefs", "8", Handshake],
              ["Award candidates", "5", Star]
            ].map(([label, value, Icon]) => (
              <div key={label} className="rounded-lg border border-line bg-paper p-5">
                <Icon className="text-green" size={22} aria-hidden="true" />
                <p className="mt-4 text-3xl font-black text-deep">{value}</p>
                <p className="mt-2 text-sm font-bold text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [message, setMessage] = useState("");

  const submitContact = (event) => {
    event.preventDefault();
    setMessage("Thank you. The Sustainability Centre team can follow up with the details you provided.");
  };

  return (
    <section id="contact" className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase text-green">Contact</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-deep md:text-4xl">
            Connect with the Sustainability Centre
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Students, NGOs, and faculty teams can use the same contact point for onboarding, project questions, and
            recognition support.
          </p>
          <div className="mt-8 grid gap-4">
            <a className="flex items-center gap-3 rounded-lg border border-line bg-paper p-4 font-black text-deep" href="mailto:business.admission@ktk.pte.hu">
              <Mail className="text-green" size={20} aria-hidden="true" />
              business.admission@ktk.pte.hu
            </a>
            <a className="flex items-center gap-3 rounded-lg border border-line bg-paper p-4 font-black text-deep" href="tel:+3672501599">
              <Phone className="text-green" size={20} aria-hidden="true" />
              +36 72 501 599
            </a>
            <p className="flex items-center gap-3 rounded-lg border border-line bg-paper p-4 font-black text-deep">
              <MapPin className="text-green" size={20} aria-hidden="true" />
              Rákóczi street 80., H-7622 Pécs, Hungary
            </p>
          </div>
        </div>
        <form className="rounded-lg border border-line bg-paper p-6 shadow-calm" onSubmit={submitContact}>
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-black text-slate-600">
              Name
              <input className="min-h-12 rounded-md border border-line px-4 font-medium text-ink" placeholder="Your name" />
            </label>
            <label className="grid gap-2 text-sm font-black text-slate-600">
              Email
              <input className="min-h-12 rounded-md border border-line px-4 font-medium text-ink" type="email" placeholder="you@example.com" />
            </label>
            <label className="grid gap-2 text-sm font-black text-slate-600">
              Interest
              <select className="min-h-12 rounded-md border border-line bg-white px-4 font-medium text-ink">
                <option>Student participation</option>
                <option>NGO partnership</option>
                <option>Faculty coordination</option>
                <option>Award recognition</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black text-slate-600">
              Message
              <textarea className="min-h-28 rounded-md border border-line px-4 py-3 font-medium text-ink" placeholder="Tell us what you would like to coordinate." />
            </label>
            <button
              className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md bg-deep px-5 py-3 font-black text-white shadow-calm hover:bg-ink"
              type="submit"
            >
              Send Message
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            {message ? (
              <p className="rounded-md border border-green/30 bg-mist px-4 py-3 text-sm font-black text-green" role="status">
                {message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#2f6bc5] bg-[#2f6bc5] py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-56 items-center justify-start overflow-hidden rounded-md bg-[#2f6bc5] px-3">
            <img
              className="max-h-12 w-auto object-contain"
              src={logoUrl}
              alt="University of Pécs Faculty of Business and Economics"
            />
          </span>
          <div>
            <p className="font-black">Sustainability Action Lab</p>
            <p className="mt-1 text-sm text-white/75">University of Pécs Sustainability Centre</p>
          </div>
        </div>
        <p className="text-sm text-white/75">Students, partners, and faculty working toward measurable local impact.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activePortalTab, setActivePortalTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header activePortalTab={activePortalTab} setActivePortalTab={setActivePortalTab} />
      <main className="pt-20">
        <Hero setActivePortalTab={setActivePortalTab} />
        <FeatureCards />
        <StudentPortal activePortalTab={activePortalTab} setActivePortalTab={setActivePortalTab} />
        <RecognitionTables />
        <ProjectBoard />
        <StudentGallery />
        <PartnerAdmin />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
