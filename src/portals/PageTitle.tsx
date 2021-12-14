import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

export interface IProps {
  pageTitle: string;
  siteTitle: string;
}
const Title: React.FC<IProps> = ({ pageTitle, siteTitle }) => {
  const [titleEl, setTitleEl] = useState<HTMLElement>();
  useEffect(() => {
    setTitleEl(document.getElementsByTagName("title")[0]);
  }, []);

  const title = useMemo(() => {
    if (!pageTitle) {
      return "Wealthface - your access to wealth being";
    }
    return `${siteTitle} - ${pageTitle}`;
  }, [pageTitle, siteTitle]);

  if (!titleEl) {
    return null;
  }
  return ReactDOM.createPortal(title, titleEl);
};

export default Title;
