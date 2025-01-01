const PREFIX = "arcticons:";

const c = function composeName(name) {
  return `${PREFIX}${name}`;
};

export const ICON_NAMES = {
  openai: c("openai-chatgpt"),
  private: c("privatelock"),
  secure: c("secure-tan"),
};
