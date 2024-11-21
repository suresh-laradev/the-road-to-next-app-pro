import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { OrganizationList } from "@/features/organization/components/organization-list";
import { organizationCreatePath, organizationsPath } from "@/paths";
import { getAuth } from "@/features/auth/queries/get-auth";
import { redirect } from "next/navigation";

const SelectActiveOrganizationsPage = async () => {
  const { user } = await getAuth();

  if (user?.activeOrganizationId) {
    redirect(organizationsPath());
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Select Organizations"
        description="Pick one organization to work with"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <LucidePlus className="w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationsPage;
