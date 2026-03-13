import React from "react";
import WorkCard from "../WorkCard";
import portfolio from "../../data/portfolio.json";

const Work = () => {
  const projects = portfolio.projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {projects.map((project) => (
        <WorkCard
          key={project.id}
          img={project.imageSrc}
          name={project.title}
          description={project.description}
          slug={project.slug}
        />
      ))}
    </div>
  );
};

export default Work;