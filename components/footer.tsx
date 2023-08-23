import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Container from "./container";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-50 border-t border-neutral-200 fixed bottom-0">
      <Container>
        <div className="flex gap-4 py-2">
          <a href="https://github.com/michaelhly">
            <FontAwesomeIcon icon={faGithubAlt} />
          </a>
          <a href="mailto:michaelhly@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
