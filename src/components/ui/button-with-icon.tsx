import { IconGitBranch } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  );
}
