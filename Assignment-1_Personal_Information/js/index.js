const page = document.getElementById("box");
page.style.display = "flex";
page.style.flexDirection = "column";
page.style.alignItems = "center";
page.style.justifyContent = "center";
const skills = ["React", "Node", "Postgresql", "Nest Js", "MongoDB"];

const projects = [
  "Secret Sharing App",
  "Google Auth Implementation",
  "Speech Recognition System",
  "Tour booking Application",
  "Netflix clone",
];

const createHtmlElement = (tag, data) => {
  const element = document.createElement(tag);
  if (tag === "img") {
    element.src =
      "https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/274242740_1145919886162116_1128837405799609912_n.jpg?_nc_cat=103&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=vwaC0nZ2SuUAX-uJ2O2&tn=w2A6O__1Xh1b4qIV&_nc_ht=scontent.fktm3-1.fna&oh=00_AT_PCYYDTPKCS4a-gMkGwnD5bu7gL8fJ4AmlitNiyNMk7g&oe=627EEBF1";
    page.appendChild(element);
    return element;
  }
  const content = document.createTextNode(data);
  element.appendChild(content);
  page.appendChild(element);
  return element;
};

const createButtonWithAttributes = (tag, content) => {
  const element = document.createElement(tag);
  const updatedContent = document.createTextNode(content);
  element.appendChild(updatedContent);
  return function (dataIdName, isActive) {
    if (isActive) {
      element.classList.add("btn", isActive);
    }
    element.classList.add("btn");
    element.setAttribute("data-id", dataIdName);
    buttonDiv.appendChild(element);
    page.appendChild(buttonDiv);
  };
};

createParagraphWithAttributes = (tag) => {
  const element = document.createElement(tag);
  return function (idName, isActive) {
    if (isActive) {
      element.classList.add("content", isActive);
    }
    element.classList.add("content");
    element.setAttribute("id", idName);
    return element;
  };
};

createList = (tag) => {
  const element = document.createElement(tag);
  return function (list) {
    for (i = 0; i < list.length; i++) {
      let createdLists = createHtmlElement("li", list[i]);
      element.append(createdLists);
    }
    return element;
  };
};

createHtmlElement("h1", "Personal Profile");

createHtmlElement("img");

const buttonDiv = document.createElement("div");
buttonDiv.style.margin = "30px";

createButtonWithAttributes("button", "About Me")("aboutMe", "active");

createButtonWithAttributes("button", "Skills")("skills");

createButtonWithAttributes("button", "Projects")("projects");

const infoDetailDiv = document.createElement("div");

page.appendChild(infoDetailDiv);

const aboutParagraphDiv = createParagraphWithAttributes("div")(
  "aboutMe",
  "active"
);
const skillsParagraphDiv = createParagraphWithAttributes("div")("skills");

const projectParagraphDiv = createParagraphWithAttributes("div")("projects");

infoDetailDiv.append(
  aboutParagraphDiv,
  skillsParagraphDiv,
  projectParagraphDiv
);

const aboutParagraph = createHtmlElement(
  "p",
  "Hey there!! My name is Swejal Shrestha. I am currently working as a fullstack enginner at Outside.I am a musician who loves jamming out to rock, metal and japanese songs"
);

aboutParagraphDiv.appendChild(aboutParagraph);

let skillsList = createList("ol")(skills);

let projectList = createList("ol")(projects);

skillsParagraphDiv.appendChild(skillsList);

projectParagraphDiv.appendChild(projectList);

buttonDiv.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    const getAllButtons = buttonDiv.querySelectorAll(".btn");
    getAllButtons.forEach((eachbut) => {
      eachbut.classList.remove("active");
    });
    e.target.classList.add("active");
    const getAllParagraphs = infoDetailDiv.querySelectorAll(".content");

    getAllParagraphs.forEach((eachPara) => {
      eachPara.classList.remove("active");
    });
    const selectedParagraph = document.getElementById(id);
    selectedParagraph.classList.add("active");
  }
});
