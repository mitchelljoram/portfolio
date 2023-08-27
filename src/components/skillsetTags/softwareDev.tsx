import { useEffect, useState } from "react";

interface LanguageTagProps {
  name: string;
  hex: string;
  dimension: number; // width of image
}

const LanguageTag = ({name, hex, dimension}: LanguageTagProps) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const [xy, setXY] = useState({x:0,y:0})
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    setScrollPosition(Math.round(window.scrollY));

    window.addEventListener("scroll", () => {
      setScrollPosition(Math.round(window.scrollY));
    })
    
    window.addEventListener("mousemove", (e) => {
      setXY({x: e.clientX - 50, y: e.clientY - 50})
    })
  }, [])

  return (
    <div width="175px" height="175px" background={`#${hex}40`} borderColor={`#${hex}`} borderWidth="2" cursor="default" onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div display={hovered ? "flex" : "none"} position="absolute" zIndex={10} width="100px" height="100px" background={`#${hex}bf`} backdropFilter="saturate(100%) blur(10px)" borderRadius="50%" justifyContent="center" left={xy.x} top={xy.y+scrollPosition} cursor="default">
        <div my="auto">
          <h3 color="#fff">{name}</h3>
        </div>
      </div>
      <div width={`${dimension}px`} position="relative" top="37.5px" mx="auto">
          <img src={`/skills/developer/${name.toLowerCase()}.png`} alt={name.toLowerCase()} layout="fill"/>
      </div>
    </div>
  )
}

export function SoftwareDevSkillsetTags(...props) {
  const languages: LanguageTagProps[] = [{name: "HTML5", hex: "ff5722", dimension: 100}, {name: "CSS3", hex: "2196f3", dimension: 100}, {name: "TypeScript", hex: "3078c6", dimension: 100}, {name: "React", hex: "60dafa", dimension: 115}, {name: "Tailwind", hex: "18b9b9", dimension: 153}, {name: "GIT", hex: "ef5132", dimension: 100}, {name: "VSCode", hex: "0065a9", dimension: 100}, {name: "GitHub", hex: "000000", dimension: 100}];
  const skills: string[] = ["Software Engineering", "Full-stack Development", "Data Structures", "Database Design and Implementation", "CI/CD", "Agile Development", "Scrum", "UI/UX Design", "Unit Testing", "A/B Testing", "Debugging", "System Diagnostics", "Troubleshooting"]

  return (
    <div {...props}>
      <div display="grid" gridTemplateColumns={"auto auto auto auto"} gap="5" justifyContent="center" mx="auto" mt="10">
        {languages.map((language, index) => (
          <LanguageTag key={index} {...language}/>
        ))}
      </div>
      <div display="grid" gridTemplateColumns={"auto auto auto auto"} gap="5" justifyContent="center" mx="auto" mt="10">
        {skills.map((skill, index) => (
          <div key={index} width={skill.length >= 15 ? "320px":"150px"} gridColumn={skill.length >= 15 ? "span 2":"span 1"} background="#191924" borderRadius="8" color="#fff" textAlign="center" px="3" py="2">
            <strong>{skill}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}