export function DataAnalystSkillsetTags(...props) {
  const skills = ["Data Science", "Data Cycle", "Data Collection", "Data Management", "Data Cleaning", "Data Analysis", "Data Interpretation", "Identifying Trends", "Statistics", "Data Visualization", "Data Reporting"]
    
  return (
    <div {...props}>
      <div display="grid" gridTemplateColumns={"auto auto auto auto"} gap="20px" justifyContent="center" mx="auto" mt="10" {...props}>
        {skills.map((skill,index) => (
          <div key={index} width={skill.length >= 15 ? "320px":"150px"} gridColumn={skill.length >= 15 ? "span 2":"span 1"} background="#191924" borderRadius="4" color="#fff" textAlign="center" px="3" py="2">
            <strong>{skill}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}