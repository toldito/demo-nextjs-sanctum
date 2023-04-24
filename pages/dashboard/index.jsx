import {getSession} from "next-auth/react";
import {Fragment, useState} from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Flex,
  Icon,
  TextInput,
  Grid,
  Col,
  DateRangePicker,
  SelectBox,
  SelectBoxItem,
  Button,
  Badge,
} from "@tremor/react";
import {Popover, Transition} from "@headlessui/react";
import {es} from "date-fns/locale";

import {cn} from "@/shared/utils";
import {Icons} from "@/components/icons";
import {Label} from "@/components/ui/label";
import {DashboardLayout} from "@/layouts/dashboard";
import {DashboardShell} from "@/components/shell";
import {DashboardHeader} from "@/components/header-auth";

const data = [
  {
    name: "Viola Amherd",
    Role: "Federal Councillor",
    departement: "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    status: {
      text: "active",
      color: "green",
    },
  },
  {
    name: "Simonetta Sommaruga",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
    status: {
      text: "active",
      color: "green",
    },
  },
  {
    name: "Alain Berset",
    Role: "Federal Councillor",
    departement: "The Federal Department of Home Affairs (FDHA)",
    status: {
      text: "active",
      color: "green",
    },
  },
  {
    name: "Ignazio Cassis",
    Role: "Federal Councillor",
    departement: "The Federal Department of Foreign Affairs (FDFA)",
    status: {
      text: "disabled",
      color: "slate",
    },
  },
  {
    name: "Ueli Maurer",
    Role: "Federal Councillor",
    departement: "The Federal Department of Finance (FDF)",
    status: {
      text: "active",
      color: "green",
    },
  },
  {
    name: "Guy Parmelin",
    Role: "Federal Councillor",
    departement: "The Federal Department of Economic Affairs, Education and Research (EAER)",
    status: {
      text: "active",
      color: "green",
    },
  },
  {
    name: "Karin Keller-Sutter",
    Role: "Federal Councillor",
    departement: "The Federal Department of Justice and Police (FDJP)",
    status: {
      text: "waiting",
      color: "amber",
    },
  },
];

export default function Dashboard() {
  const [value, setValue] = useState([new Date(2023, 1, 1), new Date()]);

  return (
    <DashboardLayout>
      <DashboardShell>
        <DashboardHeader heading="Dashboard" />
        <Card>
          <div className="flex justify-between">
            <div>
              <Flex alignItems="center" className="space-x-0.5" justifyContent="start">
                <Title> Lista de ordenes </Title>
              </Flex>
              <Text>Daily increase or decrease per domain</Text>
            </div>
            <div className="mt-6 md:mt-0">
              <Popover className="relative">
                {({open}) => (
                  <>
                    <Popover.Button
                      className={cn(
                        "group inline-flex items-center rounded-md bg-transparent px-3 py-2 text-sm text-primary-700 font-semibold  bg-primary-50 hover:bg-primary-100 focus:outline-none duration-200 transition-colors",
                        {"bg-primary-100": open},
                      )}
                    >
                      <Icon
                        className={cn("text-inherit stroke-current")}
                        icon={Icons.filter}
                        size="sm"
                      />{" "}
                      Filtrar
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 right-1 sm:px-0">
                        <Card>
                          <form>
                            <Grid className="gap-4" numCols={2}>
                              <Col numColSpan={2}>
                                <Label html-for="order">Número de orden</Label>
                                <TextInput id="order" placeholder="" />
                              </Col>
                              <Col>
                                <Label html-for="type">Tipo</Label>
                                <SelectBox defaultValue="1" id="type">
                                  <SelectBoxItem text="Todos" value="1" />
                                  <SelectBoxItem text="Compra" value="2" />
                                  <SelectBoxItem text="Servicios" value="3" />
                                </SelectBox>
                              </Col>
                              <Col>
                                <Label html-for="origin">Origen</Label>
                                <SelectBox defaultValue="1" id="origin">
                                  <SelectBoxItem text="Activos" value="1" />
                                  <SelectBoxItem text="Consumo" value="2" />
                                  <SelectBoxItem text="Materiales" value="3" />
                                  <SelectBoxItem text="Servicios" value="4" />
                                </SelectBox>
                              </Col>
                              <Col numColSpan={2}>
                                <Label html-for="status">Estado</Label>
                                <SelectBox defaultValue="1" id="status">
                                  <SelectBoxItem text="Aprobado" value="1" />
                                  <SelectBoxItem text="En remisión" value="2" />
                                  <SelectBoxItem text="Emitida" value="3" />
                                  <SelectBoxItem text="Rechazado" value="4" />
                                </SelectBox>
                              </Col>
                              <Col numColSpan={2}>
                                <Label html-for="origin">Fecha de emisión</Label>
                                <DateRangePicker
                                  className="max-w-md mx-auto"
                                  dropdownPlaceholder="Seleccionar"
                                  locale={es}
                                  value={value}
                                  onValueChange={setValue}
                                />
                              </Col>
                              <Col numColSpan={2}>
                                <Flex alignItems="center" className="gap-4" justifyContent="end">
                                  <Button color="indigo" size="sm" variant="secondary">
                                    Descartar
                                  </Button>
                                  <Button color="indigo" size="sm" variant="primary">
                                    Aplicar búsqueda
                                  </Button>
                                </Flex>
                              </Col>
                            </Grid>
                          </form>
                        </Card>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Department</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text>{item.Role}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.departement}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge color={item.status?.color}>{item.status?.text}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </DashboardShell>
    </DashboardLayout>
  );
}

export const getServerSideProps = async ({req}) => {
  const session = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
};
