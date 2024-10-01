import BookForm from "@/components/admin/BookForm";
import AppointmentDialog from "@/components/AppointmentDialog";
import CalendlyWidget from "@/components/CalendlyWidget";
import DataNotFound from "@/components/DataNotFound";
import { ICustomer } from "@/components/RazorPay";
import {
  checkPaymentStatus,
  fetchProfessorById,
  fetchUserDetails,
} from "@/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const professor = await fetchProfessorById(Number(id));
  const currentUser = await fetchUserDetails();
  const customer: ICustomer = {
    name: `${currentUser?.firstName} ${currentUser?.lastName}`,
    email: currentUser?.email!,
    phone: currentUser?.phone!.toString(),
    id: currentUser?.id!,
  };
  const paymentStatus = await checkPaymentStatus(
    professor.id,
    currentUser?.id!
  );
  if (!professor.calendlyLink) {
    return (
      <>
        <DataNotFound
          title="No Data Available"
          message="It looks like we don't have any data to display at the moment."
          actionLabel="Go Back"
        />
      </>
    );
  }
  if (!paymentStatus.success) {
    return (
      <AppointmentDialog
        customer={customer}
        professor={professor}
        amount={300}
        open={true}
      />
    );
  }
  if (paymentStatus.success) {
    return (
      <>
        <CalendlyWidget
          url={professor.calendlyLink}
          name={`${currentUser?.firstName} ${currentUser?.lastName}`}
          email={currentUser?.email!}
          paymentId={paymentStatus.paymentId!}
        />
      </>
    );
  }
}
