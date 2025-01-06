import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
interface IAlwanLinkProps {
  label: string;
  href: string;
}

interface IAlwanBreadcrumbProps {
  links: IAlwanLinkProps[];
  page: string;
  className?: string;
}

const AlwanBreadCrumb: React.FC<IAlwanBreadcrumbProps> = ({
  links,
  page,
  className,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className={className}>
        {links.map((link: IAlwanLinkProps) => (
          <div key={link.label} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-[6px]" />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AlwanBreadCrumb;
