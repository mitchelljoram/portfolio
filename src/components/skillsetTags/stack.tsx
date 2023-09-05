import { useEffect, useState } from "react";

interface LanguageTagProps {
  name: string;
  hex: string;
  dimension: number; // width of image
}

export function StackSkillsetTags(...props) {
  const [hoverer, setHoverer] = useState<LanguageTagProps>(null)
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

  const languages: LanguageTagProps[] = [
      {name: "HTML5", hex: "ff5722", dimension: 100}, 
      {name: "CSS3", hex: "2196f3", dimension: 100}, 
      {name: "JavaScript", hex: "ffdf00", dimension: 100},
      {name: "TypeScript", hex: "3078c6", dimension: 100}, 
      {name: "React", hex: "60dafa", dimension: 115}, 
      {name: "Tailwind", hex: "18b9b9", dimension: 153},
      {name: "Python", hex: "ffca1d", dimension: 100},
      {name: "Java", hex: "de8e2f", dimension: 100},
      {name: "C++", hex: "004482", dimension: 100},
      {name: "SQL", hex: "a91c22", dimension: 100},
      {name: "R", hex: "63aaed", dimension: 100},  
      {name: "GIT", hex: "ef5132", dimension: 100}, 
      {name: "Excel", hex: "16a465", dimension: 100}, 
      {name: "Tableau", hex: "5c6692", dimension: 100},
      {name: "VSCode", hex: "0065a9", dimension: 100}, 
      {name: "GitHub", hex: "000000", dimension: 100},
  ];
    
    return (
      <div {...props}>
        <div display="grid" gridTemplateColumns={"auto auto auto auto"} gap="20px" justifyContent="center" mx="auto" mt="10">
          {languages.map(({name, hex, dimension}: LanguageTagProps, index) => (
            <div key={index} width="175px" height="175px" background={`#${hex}40`} borderColor={`#${hex}`} borderWidth="2" cursor="default" onMouseOverCapture={() => {if(hoverer === null) {setHoverer({name, hex, dimension})}}} onMouseLeave={() => {if(hoverer) {setHoverer(null)}}}>
              <div width={`${dimension}px`} position="relative" top="37.5px" mx="auto">
                  <img src={`/skills/stack/${name.toLowerCase()}.png`} alt={name.toLowerCase()} layout="fill"/>
              </div>
            </div>
          ))}
        </div>
        <div display="flex" position="absolute" zIndex={10} width="100px" height="100px" background={hoverer ? `#${hoverer.hex}bf` : null} backdropFilter="saturate(100%) blur(10px)" borderRadius="50%" justifyContent="center" left={xy.x} top={xy.y+scrollPosition} transform={hoverer ? "scale(1)" : "scale(0.01)"} transition="all 1s ease" transitionTimingFunction={"cubic-bezier(0,.25,.5,1)"} cursor="default" pointerEvents="none">
          <div my="auto">
            <h3 color="#fff">{hoverer ? hoverer.name : null}</h3>
          </div>
        </div>
      </div>
    );
}