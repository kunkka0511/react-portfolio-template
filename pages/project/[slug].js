import Link from "next/link";
import data from "../../data/portfolio.json";

const normalizeToList = (value) => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export default function ProjectPage({ project }) {
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fffdf8] via-[#f8fbff] to-[#fffaf5] text-black px-6 py-20">
        <p className="text-xl">Project not found</p>
      </div>
    );
  }

  const roleList = normalizeToList(project.role);
  const learnedList = normalizeToList(project.learned);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf8] via-[#f8fbff] to-[#fffaf5] text-black">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <Link href="/" passHref legacyBehavior>
            <a className="inline-flex items-center text-sm opacity-70 hover:opacity-100 transition">
              ← Back to home
            </a>
          </Link>

          {project.github && project.github.trim() !== "" && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:opacity-90 transition"
            >
              <img
                src="/images/github.svg"
                alt="GitHub"
                className="w-4 h-4"
              />
              View Source
            </a>
          )}
        </div>

        {/* Hero */}
        <section className="mb-14">
          <p className="text-sm uppercase tracking-[0.2em] opacity-50 mb-4">
            Project Detail
          </p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl opacity-70 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </section>

        {/* Main image */}
        <section className="mb-16">
          <div className="rounded-3xl overflow-hidden bg-white/70 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <img
              src={project.imageSrc}
              alt={project.title}
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* Overview + Tools */}
        <section className="grid md:grid-cols-3 gap-10 mb-20">
          <div className="md:col-span-2 rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">Overview</h2>
            <p className="text-base md:text-lg leading-8 opacity-80">
              {project.overview || project.description}
            </p>
          </div>

          <div className="rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">Tools</h2>
            <div className="flex flex-wrap gap-3">
              {project.tools?.map((tool, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-black text-white text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge + Solution */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Challenge</h2>
            <p className="text-base md:text-lg leading-8 opacity-80">
              {project.challenge || "No challenge description added yet."}
            </p>
          </div>

          <div className="rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Solution</h2>
            <p className="text-base md:text-lg leading-8 opacity-80">
              {project.solution || "No solution description added yet."}
            </p>
          </div>
        </section>

        {/* My Role + What I Learned */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">My Role</h2>

            {roleList.length > 0 ? (
              <ul className="space-y-3">
                {roleList.map((item, index) => (
                  <li
                    key={index}
                    className="text-base md:text-lg leading-8 opacity-80 flex gap-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-black shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base md:text-lg leading-8 opacity-80">
                No role details added yet.
              </p>
            )}
          </div>

          <div className="rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">What I Learned</h2>

            {learnedList.length > 0 ? (
              <ul className="space-y-3">
                {learnedList.map((item, index) => (
                  <li
                    key={index}
                    className="text-base md:text-lg leading-8 opacity-80 flex gap-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-black shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base md:text-lg leading-8 opacity-80">
                No learning notes added yet.
              </p>
            )}
          </div>
        </section>

        {/* Duration */}
        {project.duration && project.duration.trim() !== "" && (
          <section className="mb-20">
            <div className="rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Duration</h2>
              <p className="text-base md:text-lg leading-8 opacity-80">
                {project.duration}
              </p>
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-8">Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden bg-white/70 border border-black/5 shadow-md"
                >
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-[1.02] transition duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {project.video && project.video.trim() !== "" && (
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-8">Video Demo</h2>
            <div className="overflow-hidden rounded-2xl shadow-lg bg-black aspect-video">
              {project.video.endsWith(".mp4") ? (
                <video className="w-full h-full" controls>
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={project.video}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </section>
        )}

        {/* Result */}
        <section className="mb-8 rounded-[28px] border border-black/5 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Result</h2>
          <p className="text-base md:text-lg leading-8 opacity-80">
            {project.result || "No result description added yet."}
          </p>
        </section>

        <section className="pt-4">
          <Link href="/" passHref legacyBehavior>
            <a className="inline-block mt-4 px-6 py-3 rounded-full bg-black text-white hover:opacity-90 transition">
              Back to home
            </a>
          </Link>
        </section>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = data.projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = data.projects.find((item) => item.slug === params.slug);

  return {
    props: {
      project: project || null,
    },
  };
}