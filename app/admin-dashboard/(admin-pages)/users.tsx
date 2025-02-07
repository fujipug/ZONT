import React, { Key, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import { getUsers } from "@/app/network/firebase";
import { DocumentData } from "firebase/firestore";
import EditUserModal from "../modals/editUser";

export const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "ROL", uid: "role" },
  { name: "INFORMACION", uid: "info" },
  { name: "PUNTOS", uid: "points" },
  { name: "ACTIONS", uid: "actions" },
];

export const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function Users() {
  const [users, setUsers] = useState<DocumentData[]>([]);

  useEffect(() => {
    // Fetch users from the server
    getUsers().then((users) => {
      setUsers(users);
    })
  }, []);

  const renderCell = useCallback((user: DocumentData, columnKey: Key) => {
    const cellValue = user[columnKey as string];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.imgUrl }}
            description={`${user.firstName} ${user.lastName}`}
            name={user.djName}
          >
            {user.email}
          </User>
        );
      case "role":
        const badgeColor = user.role === "admin" ? "success" : "default";
        return (
          <Chip className="capitalize" color={badgeColor} size="sm" variant="flat">
            {user.role ? user.role : "usuario"}
          </Chip>
        );
      case "info":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user.email}</p>
            {/* <p className="text-bold text-sm text-default-400">{user.phoneNumber}</p> */}
          </div>
        );
      case "points":
        return (
          <Chip className="capitalize" color='secondary' size="sm" variant="flat">
            {user.points}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <EditUserModal user={user} />
            <Tooltip color="danger" content="Borrar usuario">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(user) => (
            <TableRow key={user.userId}>
              {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

