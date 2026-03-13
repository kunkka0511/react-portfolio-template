import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "next-themes";

// Data
import yourData from "../data/portfolio.json";
import Cursor from "../components/Cursor";

const Edit = () => {
  const [data, setData] = useState(yourData);
  const [currentTabs, setCurrentTabs] = useState("HEADER");
  const { theme } = useTheme();

  const saveData = async () => {
    if (process.env.NODE_ENV === "development") {
      try {
        const response = await fetch("/api/portfolio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        alert("Saved successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to save data");
      }
    } else {
      alert("This thing only works in development mode.");
    }
  };

  // -----------------------------
  // Project Handlers
  // -----------------------------
  const editProjects = (projectIndex, editProject) => {
    const copyProjects = [...data.projects];
    copyProjects[projectIndex] = { ...editProject };
    setData({ ...data, projects: copyProjects });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...data.projects,
        {
          id: uuidv4(),
          title: "New Project",
          slug: "new-project",
          description: "Project short description",
          imageSrc: "/images/project-new.jpg",
          url: "",
          github: "",
          overview: "",
          challenge: "",
          solution: "",
          result: "",
          role: "",
          learned: "",
          duration: "",
          tools: [],
          gallery: [],
          video: "",
        },
      ],
    });
  };

  const deleteProject = (id) => {
    const copyProjects = data.projects.filter((project) => project.id !== id);
    setData({ ...data, projects: copyProjects });
  };

  // -----------------------------
  // Services Handlers
  // -----------------------------
  const editServices = (serviceIndex, editService) => {
    const copyServices = [...data.services];
    copyServices[serviceIndex] = { ...editService };
    setData({ ...data, services: copyServices });
  };

  const addService = () => {
    setData({
      ...data,
      services: [
        ...data.services,
        {
          id: uuidv4(),
          title: "New Service",
          description: "Service description",
        },
      ],
    });
  };

  const deleteService = (id) => {
    const copyServices = data.services.filter((service) => service.id !== id);
    setData({ ...data, services: copyServices });
  };

  // -----------------------------
  // Socials Handlers
  // -----------------------------
  const editSocials = (socialIndex, editSocial) => {
    const copySocials = [...data.socials];
    copySocials[socialIndex] = { ...editSocial };
    setData({ ...data, socials: copySocials });
  };

  const addSocials = () => {
    setData({
      ...data,
      socials: [
        ...data.socials,
        {
          id: uuidv4(),
          title: "New Link",
          link: "https://example.com",
        },
      ],
    });
  };

  const deleteSocials = (id) => {
    const copySocials = data.socials.filter((social) => social.id !== id);
    setData({ ...data, socials: copySocials });
  };

  // -----------------------------
  // Resume Handlers
  // -----------------------------
  const handleAddExperiences = () => {
    setData({
      ...data,
      resume: {
        ...data.resume,
        experiences: [
          ...data.resume.experiences,
          {
            id: uuidv4(),
            dates: "Enter Dates",
            type: "Full Time",
            position: "Frontend Engineer at X",
            bullets: "Worked on the frontend of a React application",
          },
        ],
      },
    });
  };

  const handleEditExperiences = (index, editExperience) => {
    const copyExperiences = [...data.resume.experiences];
    copyExperiences[index] = { ...editExperience };
    setData({
      ...data,
      resume: { ...data.resume, experiences: copyExperiences },
    });
  };

  const handleDeleteExperience = (id) => {
    const copyExperiences = data.resume.experiences.filter(
      (experience) => experience.id !== id
    );
    setData({
      ...data,
      resume: { ...data.resume, experiences: copyExperiences },
    });
  };

  // -----------------------------
  // UI helpers
  // -----------------------------
  const inputClass =
    "w-4/5 ml-10 p-2 rounded-md shadow-lg border-2 bg-transparent";
  const textareaClass =
    "w-4/5 ml-10 p-2 rounded-md shadow-lg border-2 bg-transparent min-h-[110px]";
  const smallTextareaClass =
    "w-4/5 ml-10 p-2 rounded-md shadow-lg border-2 bg-transparent min-h-[80px]";

  return (
    <div className={`container mx-auto ${data.showCursor && "cursor-none"}`}>
      <Header isBlog />
      {data.showCursor && <Cursor />}

      <div className="mt-10">
        <div className={`${theme === "dark" ? "bg-transparent" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">Dashboard</h1>
            <div className="flex items-center">
              <Button onClick={saveData} type="primary">
                Save
              </Button>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 mt-4">
            <Button
              onClick={() => setCurrentTabs("HEADER")}
              type={currentTabs === "HEADER" && "primary"}
            >
              Header
            </Button>
            <Button
              onClick={() => setCurrentTabs("PROJECTS")}
              type={currentTabs === "PROJECTS" && "primary"}
            >
              Projects
            </Button>
            <Button
              onClick={() => setCurrentTabs("SERVICES")}
              type={currentTabs === "SERVICES" && "primary"}
            >
              Services
            </Button>
            <Button
              onClick={() => setCurrentTabs("ABOUT")}
              type={currentTabs === "ABOUT" && "primary"}
            >
              About
            </Button>
            <Button
              onClick={() => setCurrentTabs("SOCIAL")}
              type={currentTabs === "SOCIAL" && "primary"}
            >
              Social
            </Button>
            <Button
              onClick={() => setCurrentTabs("RESUME")}
              type={currentTabs === "RESUME" && "primary"}
            >
              Resume
            </Button>
          </div>
        </div>

        {/* HEADER */}
        {currentTabs === "HEADER" && (
          <div className="mt-10">
            <div className="flex items-center">
              <label className="w-1/5 text-lg opacity-50">Name</label>
              <input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={inputClass}
                type="text"
              />
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-sx opacity-50">
                Header Tagline One
              </label>
              <input
                value={data.headerTaglineOne}
                onChange={(e) =>
                  setData({ ...data, headerTaglineOne: e.target.value })
                }
                className={inputClass}
                type="text"
              />
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Two
              </label>
              <input
                value={data.headerTaglineTwo}
                onChange={(e) =>
                  setData({ ...data, headerTaglineTwo: e.target.value })
                }
                className={inputClass}
                type="text"
              />
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Three
              </label>
              <input
                value={data.headerTaglineThree}
                onChange={(e) =>
                  setData({ ...data, headerTaglineThree: e.target.value })
                }
                className={inputClass}
                type="text"
              />
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Four
              </label>
              <input
                value={data.headerTaglineFour}
                onChange={(e) =>
                  setData({ ...data, headerTaglineFour: e.target.value })
                }
                className={inputClass}
                type="text"
              />
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Blog</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showBlog: true })}
                  type={data.showBlog && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showBlog: false })}
                  classes={
                    !data.showBlog && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Dark Mode</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, darkMode: true })}
                  type={data.darkMode && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, darkMode: false })}
                  classes={
                    !data.darkMode && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Show Resume</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showResume: true })}
                  type={data.showResume && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showResume: false })}
                  classes={
                    !data.showResume &&
                    "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Custom Cursor</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showCursor: true })}
                  type={data.showCursor && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showCursor: false })}
                  classes={
                    !data.showCursor &&
                    "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {currentTabs === "PROJECTS" && (
          <>
            <div className="mt-10">
              {data.projects.map((project, index) => (
                <div className="mt-10" key={project.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{project.title}</h1>
                    <Button
                      onClick={() => deleteProject(project.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Title</label>
                    <input
                      value={project.title || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          title: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Slug</label>
                    <input
                      value={project.slug || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          slug: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Description
                    </label>
                    <textarea
                      value={project.description || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          description: e.target.value,
                        })
                      }
                      className={smallTextareaClass}
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Image Source
                    </label>
                    <input
                      value={project.imageSrc || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          imageSrc: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Live URL</label>
                    <input
                      value={project.url || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          url: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">GitHub</label>
                    <input
                      value={project.github || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          github: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Duration</label>
                    <input
                      value={project.duration || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          duration: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                      placeholder="2 weeks / 1 month"
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">Overview</label>
                    <textarea
                      value={project.overview || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          overview: e.target.value,
                        })
                      }
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Challenge
                    </label>
                    <textarea
                      value={project.challenge || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          challenge: e.target.value,
                        })
                      }
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Solution
                    </label>
                    <textarea
                      value={project.solution || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          solution: e.target.value,
                        })
                      }
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">Result</label>
                    <textarea
                      value={project.result || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          result: e.target.value,
                        })
                      }
                      className={textareaClass}
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">My Role</label>
                    <textarea
                      value={project.role || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          role: e.target.value,
                        })
                      }
                      className={smallTextareaClass}
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      What I Learned
                    </label>
                    <textarea
                      value={project.learned || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          learned: e.target.value,
                        })
                      }
                      className={smallTextareaClass}
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Tools (comma)
                    </label>
                    <input
                      value={project.tools?.join(", ") || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          tools: e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-start mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Gallery (comma)
                    </label>
                    <textarea
                      value={project.gallery?.join(", ") || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          gallery: e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        })
                      }
                      className={smallTextareaClass}
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Video</label>
                    <input
                      value={project.video || ""}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          video: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <hr className="my-10" />
                </div>
              ))}
            </div>

            <div className="my-10">
              <Button onClick={addProject} type="primary">
                Add Project +
              </Button>
            </div>
          </>
        )}

        {/* SERVICES */}
        {currentTabs === "SERVICES" && (
          <>
            <div className="mt-10">
              {data.services.map((service, index) => (
                <div key={service.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{service.title}</h1>
                    <Button
                      onClick={() => deleteService(service.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Title</label>
                    <input
                      value={service.title}
                      onChange={(e) =>
                        editServices(index, {
                          ...service,
                          title: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">
                      Description
                    </label>
                    <textarea
                      value={service.description}
                      onChange={(e) =>
                        editServices(index, {
                          ...service,
                          description: e.target.value,
                        })
                      }
                      className={smallTextareaClass}
                    />
                  </div>

                  <hr className="my-10" />
                </div>
              ))}
            </div>

            <div className="my-10">
              <Button onClick={addService} type="primary">
                Add Service +
              </Button>
            </div>
          </>
        )}

        {/* ABOUT */}
        {currentTabs === "ABOUT" && (
          <div className="mt-10">
            <h1 className="text-2xl">About</h1>
            <textarea
              className="w-full h-96 mt-10 p-2 rounded-md shadow-md border bg-transparent"
              value={data.aboutpara}
              onChange={(e) => setData({ ...data, aboutpara: e.target.value })}
            />
          </div>
        )}

        {/* SOCIAL */}
        {currentTabs === "SOCIAL" && (
          <div className="mt-10">
            {data.socials.map((social, index) => (
              <div key={social.id}>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl">{social.title}</h1>
                  <Button
                    onClick={() => deleteSocials(social.id)}
                    type="primary"
                  >
                    Delete
                  </Button>
                </div>

                <div className="flex items-center mt-5">
                  <label className="w-1/5 text-lg opacity-50">Title</label>
                  <input
                    value={social.title}
                    onChange={(e) =>
                      editSocials(index, {
                        ...social,
                        title: e.target.value,
                      })
                    }
                    className={inputClass}
                    type="text"
                  />
                </div>

                <div className="flex items-center mt-5">
                  <label className="w-1/5 text-lg opacity-50">Link</label>
                  <input
                    value={social.link}
                    onChange={(e) =>
                      editSocials(index, {
                        ...social,
                        link: e.target.value,
                      })
                    }
                    className={inputClass}
                    type="text"
                  />
                </div>

                <hr className="my-10" />
              </div>
            ))}
            <div className="my-10">
              <Button onClick={addSocials} type="primary">
                Add Social +
              </Button>
            </div>
          </div>
        )}

        {/* RESUME */}
        {currentTabs === "RESUME" && (
          <div className="mt-10">
            <h1>Main</h1>

            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-sx opacity-50">Tagline</label>
              <input
                value={data.resume.tagline}
                onChange={(e) =>
                  setData({
                    ...data,
                    resume: { ...data.resume, tagline: e.target.value },
                  })
                }
                className={inputClass}
                type="text"
              />
            </div>

            <div className="flex items-center mt-5">
              <label className="w-1/5 text-lg opacity-50">Description</label>
              <textarea
                value={data.resume.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    resume: { ...data.resume, description: e.target.value },
                  })
                }
                className={smallTextareaClass}
              />
            </div>

            <hr className="my-10" />

            <h1>Experiences</h1>
            <div className="mt-10">
              {data.resume.experiences.map((experiences, index) => (
                <div className="mt-5" key={experiences.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{experiences.position}</h1>
                    <Button
                      onClick={() => handleDeleteExperience(experiences.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Dates</label>
                    <input
                      value={experiences.dates}
                      onChange={(e) =>
                        handleEditExperiences(index, {
                          ...experiences,
                          dates: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Type</label>
                    <input
                      value={experiences.type}
                      onChange={(e) =>
                        handleEditExperiences(index, {
                          ...experiences,
                          type: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Position</label>
                    <input
                      value={experiences.position}
                      onChange={(e) =>
                        handleEditExperiences(index, {
                          ...experiences,
                          position: e.target.value,
                        })
                      }
                      className={inputClass}
                      type="text"
                    />
                  </div>

                  <div className="mt-2 flex">
                    <label className="w-1/5 text-lg opacity-50">Bullets</label>
                    <div className="w-4/5 ml-10 flex flex-col">
                      <input
                        value={experiences.bullets}
                        onChange={(e) =>
                          handleEditExperiences(index, {
                            ...experiences,
                            bullets: e.target.value,
                          })
                        }
                        placeholder="Bullet One, Bullet Two, Bullet Three"
                        className="p-2 rounded-md shadow-lg border-2 bg-transparent"
                        type="text"
                      />
                    </div>
                  </div>

                  <hr className="my-10" />
                </div>
              ))}
            </div>

            <div className="my-10">
              <Button onClick={handleAddExperiences} type="primary">
                Add Experience +
              </Button>
            </div>

            <hr className="my-10" />

            <div className="mt-10">
              <h1>Education</h1>

              <div className="flex items-center mt-5">
                <label className="w-1/5 text-lg opacity-50">Name</label>
                <input
                  value={data.resume.education.universityName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      resume: {
                        ...data.resume,
                        education: {
                          ...data.resume.education,
                          universityName: e.target.value,
                        },
                      },
                    })
                  }
                  className={inputClass}
                  type="text"
                />
              </div>

              <div className="flex items-center mt-5">
                <label className="w-1/5 text-lg opacity-50">Dates</label>
                <input
                  value={data.resume.education.universityDate}
                  onChange={(e) =>
                    setData({
                      ...data,
                      resume: {
                        ...data.resume,
                        education: {
                          ...data.resume.education,
                          universityDate: e.target.value,
                        },
                      },
                    })
                  }
                  className={inputClass}
                  type="text"
                />
              </div>

              <div className="flex items-center mt-5">
                <label className="w-1/5 text-lg opacity-50">Detail</label>
                <input
                  value={data.resume.education.universityPara}
                  onChange={(e) =>
                    setData({
                      ...data,
                      resume: {
                        ...data.resume,
                        education: {
                          ...data.resume.education,
                          universityPara: e.target.value,
                        },
                      },
                    })
                  }
                  className={inputClass}
                  type="text"
                />
              </div>
            </div>

            <hr className="my-10" />

            <div className="mt-10">
              <div className="flex">
                <label className="w-1/5 text-lg opacity-50">Languages</label>
                <div className="w-4/5 ml-10 flex flex-col">
                  {data.resume.languages.map((language, index) => (
                    <div key={index} className="flex">
                      <input
                        value={language}
                        onChange={(e) => {
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              languages: [
                                ...data.resume.languages.slice(0, index),
                                e.target.value,
                                ...data.resume.languages.slice(index + 1),
                              ],
                            },
                          });
                        }}
                        className="w-full p-2 rounded-md shadow-lg border-2 bg-transparent"
                        type="text"
                      />
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              languages: data.resume.languages.filter(
                                (value, i) => index !== i
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="primary"
                    classes="hover:scale-100"
                    onClick={() =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          languages: [...data.resume.languages, "Added"],
                        },
                      })
                    }
                  >
                    Add +
                  </Button>
                </div>
              </div>

              <hr className="my-10" />

              <div className="flex">
                <label className="w-1/5 text-lg opacity-50">Frameworks</label>
                <div className="w-4/5 ml-10 flex flex-col">
                  {data.resume.frameworks.map((framework, index) => (
                    <div key={index} className="flex">
                      <input
                        value={framework}
                        onChange={(e) => {
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              frameworks: [
                                ...data.resume.frameworks.slice(0, index),
                                e.target.value,
                                ...data.resume.frameworks.slice(index + 1),
                              ],
                            },
                          });
                        }}
                        className="w-full p-2 rounded-md shadow-lg border-2 bg-transparent"
                        type="text"
                      />
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              frameworks: data.resume.frameworks.filter(
                                (value, i) => index !== i
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          frameworks: [...data.resume.frameworks, "Added"],
                        },
                      })
                    }
                    type="primary"
                    classes="hover:scale-100"
                  >
                    Add +
                  </Button>
                </div>
              </div>

              <hr className="my-10" />

              <div className="flex">
                <label className="w-1/5 text-lg opacity-50">Others</label>
                <div className="w-4/5 ml-10 flex flex-col">
                  {data.resume.others.map((other, index) => (
                    <div key={index} className="flex">
                      <input
                        value={other}
                        onChange={(e) => {
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              others: [
                                ...data.resume.others.slice(0, index),
                                e.target.value,
                                ...data.resume.others.slice(index + 1),
                              ],
                            },
                          });
                        }}
                        className="w-full p-2 rounded-md shadow-lg border-2 bg-transparent"
                        type="text"
                      />
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              others: data.resume.others.filter(
                                (value, i) => index !== i
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          others: [...data.resume.others, "Added"],
                        },
                      })
                    }
                    type="primary"
                    classes="hover:scale-100"
                  >
                    Add +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;