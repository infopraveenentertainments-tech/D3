// ================================
// SUPABASE CONNECTION
// ================================

const SUPABASE_URL = "https://umpdcdzynnqgbzmfwiyw.supabase.co";
const SUPABASE_KEY = "sb_publishable_InXm_68VoBtAI4opM5fbmw_0J7Z3Ita";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ================================
// BOOKING FORM
// ================================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");

  if (!form) {
    console.log("Booking form not found");
    return;
  }

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const button = form.querySelector("button[type='submit']");

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    if (status) {
      status.textContent = "Sending your booking enquiry...";
    }

    // Get form values
    const formData = new FormData(form);

    const booking = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      event: formData.get("event"),
      date: formData.get("date") || null,
      location: formData.get("location"),
      guests: formData.get("guests") || null,
      message: formData.get("message") || ""
    };

    console.log("Booking:", booking);

    try {

      const { data, error } = await supabaseClient
        .from("bookings")
        .insert([booking])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Booking saved:", data);

      if (status) {
        status.textContent =
          "Booking enquiry sent successfully! We will contact you shortly.";
      }

      form.reset();

      // Optional WhatsApp notification
      const whatsappMessage =
        `Hello Praveen, I would like to book a magic show.%0A%0A` +
        `Name: ${booking.name}%0A` +
        `Phone: ${booking.phone}%0A` +
        `Event: ${booking.event}%0A` +
        `Date: ${booking.date || "Not specified"}%0A` +
        `Location: ${booking.location}%0A` +
        `Guests: ${booking.guests || "Not specified"}%0A` +
        `Message: ${booking.message || "None"}`;

      window.open(
        `https://wa.me/919035528821?text=${whatsappMessage}`,
        "_blank"
      );

    } catch (error) {

      console.error(error);

      if (status) {
        status.textContent =
          "Sorry, something went wrong. Please try again or contact us on WhatsApp.";
      }

    } finally {

      if (button) {
        button.disabled = false;
        button.textContent = "Send Booking Enquiry";
      }

    }

  });

});
