import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, I'm <HighlightSpan>Honahec</HighlightSpan>!
      </p>
      <p>
        I'm <HighlightAlt>a full-stack developer</HighlightAlt> based in
        Shanghai, China.
      </p>
      <p>An undergrad student at ShanghaiTech University.</p>
    </AboutWrapper>
  );
};

export default About;
