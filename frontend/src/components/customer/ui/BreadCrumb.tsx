import React from "react";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";
interface Props {
  items: {
    name: string;
    href?: string;
  }[];
}

const BreadCrumb = ({ items }: Props) => {
  return (
    <div className="px-[15px]">
      <div className="w-full mx-auto max-w-[1200px] overflow-x-auto">
        <nav className="py-4">
          <ol className="flex items-center gap-1.5 text-[0.9rem] text-neutral whitespace-nowrap">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <li className="flex items-center gap-1 font-medium hover:text-[#444]">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="!inline-flex items-center gap-1"
                    >
                      {index === 0 && <FaHouse size={16} />}
                      {item.name}
                    </Link>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </li>

                {index < items.length - 1 && (
                  <li>
                    <FiChevronRight size={10} />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumb;
