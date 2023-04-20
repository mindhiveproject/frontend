import { StyledTermsConditions } from "./styles";

export default function TermsConditions({ btnName }) {
  return (
    <StyledTermsConditions>
      <span>
        By clicking on {btnName} you agree to MindHive’s{" "}
        <a target="_blank" href="/docs/terms" rel="noreferrer">
          Terms of Service
        </a>
        , including our{" "}
        <a target="_blank" href="/docs/privacy" rel="noreferrer">
          Privacy Policy
        </a>
        .
      </span>
    </StyledTermsConditions>
  );
}
