import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFormationDraft } from "@/features/formationWizard/useFormationDraft";
import { packages } from "@/features/packages/packagesCatalog";
import { useNavigate } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useState } from "react";

const featureRows = [
  {
    name: "Company Formation (excl. CH £100 fee)",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "FREE Fast Track Business Bank Account",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "FREE .co.uk Domain Name",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "FREE Lifetime Secretarial Support",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "FREE Online Company Portal",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "FREE Deadline Reminder Service",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "10% off Business Insurance",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Discount on Bookkeeping Software",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Digital Certificate of Incorporation",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Digital Memorandum & Articles",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Digital Share Certificate",
    digital: true,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Digital Company Register",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Digital Company Incorporation Minutes",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Printed Certificate of Incorporation",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Printed Share Certificate",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Printed Memorandum & Articles",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Printed Company Register",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "Expert Pre-Submission Review",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "GDPR Compliance Pack",
    digital: false,
    digitalPrint: true,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "London Registered Office (3 months)",
    digital: false,
    digitalPrint: false,
    printPlus: true,
    allIncl: true,
  },
  {
    name: "London Directors Service Address (12 months)",
    digital: false,
    digitalPrint: false,
    printPlus: false,
    allIncl: true,
  },
  {
    name: "London Business Mail Forwarding (3 months)",
    digital: false,
    digitalPrint: false,
    printPlus: false,
    allIncl: true,
  },
  {
    name: "VAT Registration with HMRC (Optional)",
    digital: false,
    digitalPrint: false,
    printPlus: false,
    allIncl: true,
  },
];

const pkgKeys = ["digital", "digitalPrint", "printPlus", "allIncl"] as const;

export default function ServiceComparisonTable() {
  const navigate = useNavigate();
  const { updateDraft } = useFormationDraft();
  const [_selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    const selectedPkg = packages.find((p) => p.id === packageId);
    if (selectedPkg) {
      updateDraft({
        selectedPackage: {
          id: selectedPkg.id,
          name: selectedPkg.name,
          price: selectedPkg.price,
        },
      });
    }
    navigate({ to: "/start-formation" });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 font-semibold text-sm w-1/3">
              Features
            </th>
            {packages.map((pkg) => (
              <th key={pkg.id} className="p-3 text-center">
                <div className="space-y-1">
                  {pkg.popular && (
                    <Badge className="text-xs mx-auto block w-fit">
                      Most Popular
                    </Badge>
                  )}
                  <p className="font-bold text-base">{pkg.name}</p>
                  <p className="text-2xl font-bold text-primary">
                    £{pkg.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">+ CH fee</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row, i) => (
            <tr key={row.name} className={i % 2 === 0 ? "bg-muted/20" : ""}>
              <td className="p-3 text-sm">{row.name}</td>
              {pkgKeys.map((key) => (
                <td key={key} className="p-3 text-center">
                  {row[key] ? (
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-3" />
            {packages.map((pkg) => (
              <td key={pkg.id} className="p-3 text-center">
                <Button
                  onClick={() => handleSelectPackage(pkg.id)}
                  size="sm"
                  variant={pkg.popular ? "default" : "outline"}
                  className="w-full"
                >
                  Select {pkg.name}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
