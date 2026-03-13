import React from "react";
import Link from "next/link";

const WorkCard = ({ img, name, description, slug }) => {
  return (
    <Link href={`/project/${slug}`} passHref legacyBehavior>
      <a className="block overflow-hidden rounded-2xl p-2 laptop:p-4 cursor-pointer group">
        <div
          className="relative rounded-2xl overflow-hidden bg-[#f4f4f5] transition-all duration-300 shadow-sm group-hover:shadow-xl"
          style={{ height: "360px" }}
        >
          <img
            alt={name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={img}
          />
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          {name ? name : "Project Name"}
        </h1>

        <h2 className="mt-2 text-base opacity-70 leading-relaxed">
          {description ? description : "Description"}
        </h2>
      </a>
    </Link>
  );
};

export default WorkCard;