import './BodySectionWithMarginBottom.css';
import BodySection from '../BodySection/BodySection';

export default function BodySectionWithMarginBottom(props) {
  return (
    <div className="bodySectionWithMargin" data-testid="body-section-with-margin">
      <BodySection {...props} />
    </div>
  );
}
