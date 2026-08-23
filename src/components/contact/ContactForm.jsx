import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeading from "../ui/SectionHeading";
import { emailConfig, hasEmailConfiguration } from "../../data/contact";
import {
  contactLimits,
  sanitizeText,
  validateContactForm,
} from "../../utils/contactValidation";

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
  website: "",
};

const initialSubmissionState = {
  status: "idle",
  message: "",
};

function FieldError({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="text-sm leading-6 text-accent">
      {message}
    </p>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState(initialSubmissionState);

  const lastSubmission = useRef({
    signature: "",
    timestamp: 0,
  });

  const isSubmitting = submission.status === "submitting";

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: undefined,
      }));
    }

    if (submission.status !== "idle") {
      setSubmission(initialSubmissionState);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (formData.website) {
      setSubmission({
        status: "success",
        message: "El mensaje fue recibido correctamente.",
      });

      return;
    }

    const sanitizedData = {
      name: sanitizeText(formData.name),
      email: formData.email.trim().toLowerCase(),
      subject: sanitizeText(formData.subject),
      message: sanitizeText(formData.message),
      consent: formData.consent,
      website: "",
    };

    const validationErrors = validateContactForm(sanitizedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmission({
        status: "error",
        message: "Revisa los campos marcados antes de enviar el formulario.",
      });

      return;
    }

    if (!hasEmailConfiguration()) {
      setSubmission({
        status: "error",
        message:
          "El formulario no está configurado correctamente. Intenta nuevamente más tarde.",
      });

      return;
    }

    const signature = [
      sanitizedData.email,
      sanitizedData.subject,
      sanitizedData.message,
    ].join("|");

    const currentTime = Date.now();
    const isDuplicate =
      lastSubmission.current.signature === signature &&
      currentTime - lastSubmission.current.timestamp < 60000;

    if (isDuplicate) {
      setSubmission({
        status: "error",
        message:
          "Este mensaje ya fue enviado. Espera un momento antes de volver a intentarlo.",
      });

      return;
    }

    setErrors({});
    setSubmission({
      status: "submitting",
      message: "Enviando mensaje...",
    });

    const templateParameters = {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      time: new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date()),
    };

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParameters,
        {
          publicKey: emailConfig.publicKey,
        },
      );

      lastSubmission.current = {
        signature,
        timestamp: currentTime,
      };

      setFormData(initialFormData);
      setSubmission({
        status: "success",
        message:
          "Tu mensaje fue enviado correctamente. Recibirás una confirmación automática en tu correo.",
      });
    } catch {
      setSubmission({
        status: "error",
        message:
          "No fue posible enviar el mensaje. Verifica tu conexión e intenta nuevamente.",
      });
    }
  }

  const inputClasses =
    "min-h-12 w-full border border-border bg-background px-4 py-3 text-foreground transition-colors duration-200 placeholder:text-muted/70 hover:border-muted focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="bg-surface"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          id="contacto-heading"
          number="06"
          label="Contacto"
          title="Abramos una línea de"
          accent="comunicación"
        />

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="max-w-md text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-muted">
              Este formulario permite establecer contacto relacionado con el
              portafolio, las actividades o los temas documentados durante el
              curso.
            </p>
          </div>

          <form
            className="grid gap-6 md:col-span-7 md:col-start-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="website">No completes este campo</label>

              <input
                id="website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-xs tracking-[0.12em] text-muted uppercase"
                >
                  Nombre
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  maxLength={contactLimits.name.max}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                  required
                />

                <FieldError id="name-error" message={errors.name} />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs tracking-[0.12em] text-muted uppercase"
                >
                  Correo electrónico
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                  required
                />

                <FieldError id="email-error" message={errors.email} />
              </div>
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="subject"
                className="font-mono text-xs tracking-[0.12em] text-muted uppercase"
              >
                Asunto
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className={inputClasses}
                maxLength={contactLimits.subject.max}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                disabled={isSubmitting}
                required
              />

              <FieldError id="subject-error" message={errors.subject} />
            </div>

            <div className="grid gap-2">
              <div className="flex items-end justify-between gap-4">
                <label
                  htmlFor="message"
                  className="font-mono text-xs tracking-[0.12em] text-muted uppercase"
                >
                  Mensaje
                </label>

                <span className="font-mono text-xs text-muted">
                  {formData.message.length}/{contactLimits.message.max}
                </span>
              </div>

              <textarea
                id="message"
                name="message"
                rows="7"
                value={formData.message}
                onChange={handleChange}
                className={`${inputClasses} resize-y`}
                maxLength={contactLimits.message.max}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={isSubmitting}
                required
              />

              <FieldError id="message-error" message={errors.message} />
            </div>

            <div className="grid gap-2">
              <label className="flex items-start gap-3 text-sm leading-6 text-muted">
                <input
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 size-4 accent-accent"
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent ? "consent-error" : undefined
                  }
                  disabled={isSubmitting}
                  required
                />

                <span>
                  Acepto que mis datos se utilicen únicamente para procesar y
                  responder este mensaje.
                </span>
              </label>

              <FieldError id="consent-error" message={errors.consent} />
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>

              <p
                className={`max-w-md text-sm leading-6 ${
                  submission.status === "success"
                    ? "text-terminal-success"
                    : submission.status === "error"
                      ? "text-accent"
                      : "text-muted"
                }`}
                role="status"
                aria-live="polite"
              >
                {submission.message}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
