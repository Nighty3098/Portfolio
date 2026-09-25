import en from "./locales/en.json";
import ru from "./locales/ru.json";
import { getLocalizedProjects, projectsData } from "./components/projects";

jest.mock("gsap", () => ({
  __esModule: true,
  default: { registerPlugin: jest.fn() },
}));

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

jest.mock("react-router-dom", () => ({}), { virtual: true });

const locales = [
  { name: "en", items: en.projects.items },
  { name: "ru", items: ru.projects.items },
];

const projectTitles = [
  "NyaMath",
  "The OWL",
  "IPSA",
  "IPSA MODEL",
  "SkyFall",
  "AI Video Summary Bot",
  "Ghostly Grabber",
  "OWL Rest API",
  "SkyFall Website",
  "Pretty Profile",
  "Crimson",
  "Log Insight",
  "Tech Support Bot",
  "CV Creator Bot",
  "ProxySniffer",
  "Thunder",
  "IStealU",
  "OWL Website",
];

test.each(locales)(
  "$name translations are bound by project index",
  ({ items }) => {
    const projects = getLocalizedProjects(items);

    expect(projects).toHaveLength(projectsData.projects.length);
    expect(projects.map((project) => project.title)).toEqual(projectTitles);
  },
);
