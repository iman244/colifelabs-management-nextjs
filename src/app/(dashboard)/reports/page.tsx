import { djangoUrl } from "@/django_api";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { DIcon } from "./DIcon";

type FinancialStatement = {
  id: number;
  name: string;
  material_ui_icon: string;
  slug: string;
};

const ReportsPage = async () => {
  const data = await fetch(djangoUrl + "/budgets/financial-statements/", {
    next: { revalidate: 30 },
  });
  if(data.ok === false) {
    console.log("response financial-statement", data)
    return <div>خطا در دریافت اطلاعات</div>
  }
  const financialStatements: FinancialStatement[] = await data.json();

  console.log("financialStatements", financialStatements);
  return (
 <Grid container spacing={3} justifyContent="center">
      {financialStatements.map(({ id, name, material_ui_icon, slug }) => {


        return (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={id}>
            <Link href={`/reports/${slug}`}>
              <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
                <CardActionArea>
                  <CardContent>
                    <DIcon name={material_ui_icon} sx={{ fontSize: 50, color: "primary.main" }} />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ReportsPage;