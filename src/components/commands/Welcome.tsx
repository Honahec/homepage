import {
  Cmd,
  HeroContainer,
  Link,
  PreName,
  PreNameMobile,
  PreWrapper,
  Seperator,
} from "../styles/Welcome.styled";

const Welcome: React.FC = () => {
  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <PreName>
          {`        
    __  __                 __              
   / / / /___  ____  ____ _/ /_  ___  _____
  / /_/ / __ \\/ __ \\/ __ \`/ __ \\/ _ \\/ ___/
 / __  / /_/ / / / / /_/ / / / /  __/ /__  
/_/ /_/\\____/_/ /_/\\__, /_/ /_/\\___/\\___/  
                          
          `}
        </PreName>
        <PreWrapper>
          <PreNameMobile>
            {`
    __  __                 
   / / / /___  ____  ____ _
  / /_/ / __ \\/ __ \\/ __ \`/
 / __  / /_/ / / / / /_/ / 
/_/ /_/\\____/_/ /_/\\__,_/  

    __              
   / /_  ___  _____
  / __ \\/ _ \\/ ___/
 / / / /  __/ /__  
/_/ /_/\\___/\\___/  
 
          `}
          </PreNameMobile>
        </PreWrapper>
        <div>Welcome to my terminal portfolio. </div>
        <Seperator>----</Seperator>
        <div>
          This project's source code can be found in this project's{" "}
          <Link href="https://github.com/honahec/homepage">GitHub repo</Link>.
          Forked from{" "}
          <Link href="https://github.com/satnaing/terminal-portfolio">
            satnaing's terminal portfolio
          </Link>
          .
        </div>
        <Seperator>----</Seperator>
        <div>
          For a list of available commands, type `<Cmd>help</Cmd>`.
        </div>
      </div>
    </HeroContainer>
  );
};

export default Welcome;
