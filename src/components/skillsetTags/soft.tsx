export function SoftSkillsetTags(...props) {
    const skills = ["Problem Solving", "Critical Thinking", "Strong Written Skills", "Strong Verbal Skills", "Time Management", "Self-motivation", "Teamwork", "Leadership", "Adaptability", "Work Ethic", "Attention to Detail"]
      
    return (
      <div width="800px" display="grid" gridTemplateColumns={"auto auto auto auto"} gap="20px" justifyContent="center" mx="auto" mt="10" {...props}>
        {skills.map((skill,index) => (
          <div key={index} width={skill.length >= 15 ? "320px":"150px"} gridColumn={skill.length >= 15 ? "span 2":"span 1"} background="#191924" borderRadius="8" color="#fff" textAlign="center" px="3" py="2">
            <strong>{skill}</strong>
          </div>
        ))}
      </div>
    );
  }