export const contactLimits = {
  name: {
    min: 2,
    max: 35,
  },
  subject: {
    min: 3,
    max: 100,
  },
  message: {
    min: 10,
    max: 1500,
  },
};

export function sanitizeText(value) {
  return value.replace(/[<>]/g, "").trim();
}

export function validateContactForm(formData) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (formData.name.length < contactLimits.name.min) {
    errors.name = "Escribe un nombre de al menos 2 caracteres.";
  } else if (formData.name.length > contactLimits.name.max) {
    errors.name = "El nombre no puede exceder 35 caracteres.";
  }

  if (!emailPattern.test(formData.email)) {
    errors.email = "Escribe una dirección de correo válida.";
  }

  if (formData.subject.length < contactLimits.subject.min) {
    errors.subject = "El asunto debe contener al menos 3 caracteres.";
  } else if (formData.subject.length > contactLimits.subject.max) {
    errors.subject = "El asunto no puede exceder 100 caracteres.";
  }

  if (formData.message.length < contactLimits.message.min) {
    errors.message = "El mensaje debe contener al menos 10 caracteres.";
  } else if (formData.message.length > contactLimits.message.max) {
    errors.message = "El mensaje no puede exceder 1500 caracteres.";
  }

  if (!formData.consent) {
    errors.consent =
      "Debes aceptar el uso de tus datos para enviar el mensaje.";
  }

  return errors;
}
