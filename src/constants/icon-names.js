const PREFIX = 'line-md:';

const c = function composeName(name) {
  return `${PREFIX}${name}`;
}

export const ICON_NAMES = {
  'chat': c('chat'),
};
