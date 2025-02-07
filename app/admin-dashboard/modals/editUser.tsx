'use client';
import { editUser } from "@/app/network/firebase";
import Alerts from "@/components/ui/alerts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { DocumentData } from "firebase/firestore";
import { FormEvent, useState } from "react";

const userRoles = [
  { key: "admin", label: "Admin" },
  { key: "user", label: "Usuario" },
];

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function EditUserModal({ user }: { user: DocumentData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAlertVisible, setIsAlertVisible] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    editUser(user.userId, formData).then(() => {
      setIsAlertVisible(true);
      onOpenChange();
    });
  };

  return (
    <>
      <Alerts color="success" variant="faded" title="Usuario actualizado"
        description="El usuario ha sido actualizado correctamente."
        isVisible={isAlertVisible} visibility={setIsAlertVisible} />

      <Tooltip content="Editar usuario">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon onClick={onOpen} />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Form className="w-full space-y-10" validationBehavior="native" onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Editar usuario</ModalHeader>
                <ModalBody>
                  <div className="w-full space-y-10">
                    <div className="w-full flex items-center gap-4">
                      <Input
                        isRequired
                        errorMessage="Este campo es requerido"
                        label="Nombre"
                        labelPlacement="outside"
                        name="first-name"
                        placeholder="Agregar nombre"
                        type="text"
                        defaultValue={user.firstName}
                      />

                      <Input
                        isRequired
                        errorMessage="Este campo es requerido"
                        label="Apellido"
                        labelPlacement="outside"
                        name="last-name"
                        placeholder="Agregar apellido"
                        type="text"
                        defaultValue={user.lastName}
                      />
                    </div>

                    <Input
                      isRequired
                      errorMessage="Este campo es requerido"
                      label="Email"
                      labelPlacement="outside"
                      name="email"
                      placeholder="Agregar email"
                      type="email"
                      defaultValue={user.email}
                    />

                    <Input
                      isRequired
                      errorMessage="Este campo es requerido"
                      label="Nombre de DJ"
                      labelPlacement="outside"
                      name="dj-name"
                      placeholder="Agregar nombre de DJ"
                      type="text"
                      defaultValue={user.djName}
                    />

                    <Input
                      label="Puntos acumulados"
                      labelPlacement="outside"
                      name="points"
                      placeholder="Agregar puntos"
                      type="number"
                      defaultValue={user.points}
                    />

                    <Select label="Seleccionar rol" labelPlacement="outside" name="role" defaultSelectedKeys={[user.role]}>
                      {userRoles.map((role) => (
                        <SelectItem key={role.key}>{role.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button type="submit" color="primary">
                    Actualizar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal >
    </>
  );
}
