import Container from "./container";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-50 border-t border-neutral-200 fixed bottom-0">
      <Container>
        <div className="flex gap-4 py-2">
          <a className="fas fa-envelope" href="mailto:michaelhly@gmail.com" />
          <a className="fab fa-twitter" href="https://twitter.com/michaelhly" />
          <a className="fab fa-github" href="https://github.com/michaelhly" />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
