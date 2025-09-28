import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            "ready_to_learn": "Ready to learn?",
            "set_name": "Set name",
            "set_owner": "Set owner",
            "date_created": "Date created",
            "create_a_set": "Create a set",
            "edit_set": "Edit study set",
            "account": "Account",
            "loading": "Loading...",
            "front": "Term",
            "back": "Definition",
            "study_set_not_found": "Study set not found",
            "flashcard_mode": "Flashcard mode",
            "learn_mode": "Learn mode",
            "match_mode": "Match mode",
            "quiz_mode": "Quiz mode",
            "back_to_study_set": "Back to study set",
            "for": "for",
            "start_from_beginning": "Start from beginning",
            "shuffle_flashcards": "Shuffle flashcards",
            "previous_flashcard": "Previous flashcard",
            "next_flashcard": "Next flashcard",
            "welcome": "Welcome",
            "logout": "Logout",
            "study_set": "Study set",
            "log_in": "Log in",
            "sign_up": "Sign up",
            "create": "Create",
            "add_flashcard": "Add flashcard",
            "study_set_name": "Study Set Name",
            "username": "Username",
            "password": "Password",
            "email": "Email",
            "dont_have_an_account": "Don't have an account?",
            "already_have_an_account": "Already have an account?",
            "required": "Required",
            "select_correct_answer": "Select the correct answer",
            "continue": "Continue",
            "write_your_answer": "Write your answer here",
            "submit": "Submit",
            "incorrect_answer": "The correct answer is '{{answer}}'.",
            "learn_mode_complete": "Learn mode complete!",
            "congrats_complete": "Congrats! 🎉 You have completed learn mode for {{setName}}.",
            "study_again": "Study again",
        }
    },
    "es-NI": {
        translation: {
            "ready_to_learn": "¿Listo para aprender?",
            "set_name": "Nombre de la lista",
            "set_owner": "Propietario de la lista",
            "date_created": "Fecha de creación",
            "create_a_set": "Crear una lista",
            "edit_set": "Editar lista",
            "account": "Cuenta",
            "loading": "Cargando...",
            "front": "Término",
            "back": "Definición",
            "study_set_not_found": "Lista de estudio no encontrada",
            "flashcard_mode": "Modo de tarjetas",
            "learn_mode": "Modo de aprendizaje",
            "match_mode": "Modo de coincidencia",
            "quiz_mode": "Modo de prueba",
            "back_to_study_set": "Volver a la lista",
            "for": "para",
            "start_from_beginning": "Comenzar desde el principio",
            "shuffle_flashcards": "Barajar tarjetas",
            "previous_flashcard": "Tarjeta anterior",
            "next_flashcard": "Próxima tarjeta",
            "welcome": "Bienvenido",
            "logout": "Cerrar sesión",
            "study_set": "Lista de estudio",
            "log_in": "Iniciar sesión",
            "sign_up": "Registrarse",
            "create": "Crear",
            "add_flashcard": "Agregar tarjeta",
            "study_set_name": "Nombre de la lista",
            "username": "Nombre de usuario",
            "password": "Contraseña",
            "email": "Correo electrónico",
            "dont_have_an_account": "¿No tienes una cuenta?",
            "already_have_an_account": "¿Ya tienes una cuenta?",
            "required": "Requerido",
            "select_correct_answer": "Selecciona la respuesta correcta",
            "continue": "Continuar",
            "write_your_answer": "Escribe tu respuesta aquí",
            "submit": "Enviar",
            "incorrect_answer": "La respuesta correcta es '{{answer}}'.",
            "learn_mode_complete": "¡Modo de aprendizaje completado!",
            "congrats_complete": "¡Felicidades! 🎉 Has completado el modo de aprendizaje para {{setName}}.",
            "study_again": "Estudiar de nuevo",
        }
    },
    "pt-BR": {
        translation: {
            "ready_to_learn": "Pronto para aprender?",
            "set_name": "Nome da lista",
            "set_owner": "Proprietário da lista",
            "date_created": "Data de criação",
            "create_a_set": "Criar uma lista",
            "edit_set": "Editar lista",
            "account": "Conta",
            "loading": "Carregando...",
            "front": "Termo",
            "back": "Definição",
            "study_set_not_found": "Lista de estudo não encontrada",
            "flashcard_mode": "Modo de cartões",
            "learn_mode": "Modo de aprendizado",
            "match_mode": "Modo de coincidência",
            "quiz_mode": "Modo de prova",
            "back_to_study_set": "Voltar para a lista",
            "for": "para",
            "start_from_beginning": "Começar do início",
            "shuffle_flashcards": "Embaralhar cartões",
            "previous_flashcard": "Tarjeta anterior",
            "next_flashcard": "Próxima tarjeta",
            "welcome": "Bem-vindo",
            "logout": "Sair",
            "study_set": "Lista de estudo",
            "log_in": "Entrar",
            "sign_up": "Registrar",
            "create": "Criar",
            "add_flashcard": "Adicionar cartão",
            "study_set_name": "Nome da lista",
            "username": "Nome de usuário",
            "password": "Senha",
            "email": "E-mail",
            "dont_have_an_account": "Não tem uma conta?",
            "already_have_an_account": "Já tem uma conta?",
            "required": "Obrigatório",
            "select_correct_answer": "Selecione a resposta correta",
            "continue": "Continuar",
            "write_your_answer": "Escreva sua resposta aqui",
            "submit": "Enviar",
            "incorrect_answer": "A resposta correta é '{{answer}}'.",
            "learn_mode_complete": "Modo de aprendizado concluído!",
            "congrats_complete": "Parabéns! 🎉 Você completou o modo de aprendizado para {{setName}}.",
            "study_again": "Estudar novamente",
        }
    }
};

// Get stored language from localStorage, default to 'en'
const getStoredLanguage = (): string => {
    const storedLang = localStorage.getItem('language');
    return storedLang || 'en';
};

// Save language to localStorage
const saveLanguage = (language: string): void => {
    localStorage.setItem('language', language);
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: getStoredLanguage(), // Use stored language or default to 'en'
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false // react already does escaping
        }
    });

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
    saveLanguage(lng);
});

export default i18n;
