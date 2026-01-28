import * as React from "react";
import FormContainer from "./FormContainer";
import type { UrlData } from "../interface/UrlData";
import { serverUrl } from "../helpers/Constants";
import axios from "axios";
import DataTable from "./DataTable";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const updateReloadState = (): void => {
    setReload(true);
  };

  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`);
    setData(response.data);
    setReload(false);
  };

  React.useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <>
      <FormContainer updateReloadState={updateReloadState} />
      <DataTable updateReloadState={updateReloadState} data={data} />
    </>
  );
};

export default Container;
