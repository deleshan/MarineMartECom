import { Helmet } from "react-helmet-async";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - MayoonCart`}</title>
    </Helmet>
  );
};

export default MetaData;
