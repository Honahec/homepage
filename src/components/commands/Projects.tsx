import { useContext, useEffect } from "react";
import {
  checkRedirect,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../utils/funcs";
import {
  ProjectContainer,
  ProjectDesc,
  ProjectsIntro,
  ProjectTitle,
} from "../styles/Projects.styled";
import { termContext } from "../Terminal";
import Usage from "../Usage";

const Projects: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  /* ===== check current command is redirect ===== */
  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "projects")) {
      projects.forEach(({ id, url }) => {
        id === parseInt(arg[1]) && window.open(url, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  /* ===== check arg is valid ===== */
  const checkArg = () =>
    isArgInvalid(arg, "go", ["1", "2", "3", "4"]) ? (
      <Usage cmd="projects" />
    ) : null;

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <div data-testid="projects">
      <ProjectsIntro>
        “Talk is cheap. Show me the code”? I got you. <br />
        Here are some of my projects you shouldn't miss.
      </ProjectsIntro>
      {projects.map(({ id, title, desc, category }) => (
        <ProjectContainer key={id}>
          <ProjectTitle>{`${id}. ${title}`}</ProjectTitle>
          <ProjectDesc>{category}</ProjectDesc>
          <ProjectDesc>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
      <Usage cmd="projects" marginY />
    </div>
  );
};

type ProjectDetail = {
  id: number;
  title: string;
  desc: string;
  category: string;
  url: string;
};

const projects: ProjectDetail[] = [
  {
    id: 1,
    title: "QA guatian",
    desc: "A full-stack online Q&A community platform.",
    category: "Vue.js, Python",
    url: "https://qaguatian.com/",
  },
  {
    id: 2,
    title: "Minicpu",
    desc: "A RISC-V processor that supports the RV32I basic instruction set.",
    category: "SpinalHDL",
    url: "https://github.com/honahec/minicpu",
  },
  {
    id: 3,
    title: "PintOS",
    desc: "Implemented advanced scheduling, system calls, and user program support in an educational operating system.",
    category: "C, x86 Architecture",
    url: "https://github.com/honahec/pintos",
  },
  {
    id: 4,
    title: "TechPie",
    desc: "A one-stop campus platform.",
    category: "Dart, Swift",
    url: "https://github.com/honahec/techpie-flutter",
  },
];

export default Projects;
