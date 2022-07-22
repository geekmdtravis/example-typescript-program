import labs from "./json/patientLabs.json";
import patients from "./json/patientList.json";
import user from "./json/userData.json";

type Metadata = {
  CODE: number;
  MSG: string;
  DATE: string;
  NAME: string;
  POSITION: string;
  PARAMETERS: string;
};

type CclReturnData<T> = {
  META: Array<Metadata>;
  DATA: Array<T>;
};

type User = {
  NAME: string;
  POSITION: string;
  PHYSICIAN: string;
  PID: number;
};

type Lab = {
  PID: number;
  LAB: string;
  DATE: string;
  RESULT: string;
  UNIT: string;
  REF_RANGE: string;
  FLAG: string;
};

type Encounter = {
  EID: number;
  TYPE: string;
  INST: string;
  REG_DT_TM: string;
};

type Patient = {
  PROVIDER_PID: number;
  PID: number;
  NAME: string;
  CDCR: string;
  EIDS: Array<Encounter>;
  NEW_TO_PANEL: number;
};

async function getPatientLabs(pid: number): Promise<CclReturnData<Lab>> {
  throw new Error("Not implemented");
}

async function getPatients(uid: number): Promise<CclReturnData<Patient>> {
  throw new Error("Not implemented");
}

async function getUserData(uid: number): Promise<CclReturnData<User>> {
  throw new Error("Not implemented");
}
