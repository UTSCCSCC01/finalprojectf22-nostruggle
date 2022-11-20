import { Icon } from '@iconify/react';

const buttonSx = 'calculator-button-icon';

export const IntegralButtons = [
    { action: 'cos',        icon: <Icon icon="mdi:math-cos" className={ buttonSx } /> },
    { action: 'log',        icon: <Icon icon="mdi:math-log" className={ buttonSx } /> },
    { action: 'sin',        icon: <Icon icon="mdi:math-sin" className={ buttonSx } /> },
    { action: 'tan',        icon: <Icon icon="mdi:math-tan" className={ buttonSx } /> },
    { action: 'brackets',   icon: <Icon icon="mdi:code-parentheses" className={ buttonSx } /> },
    { action: 'fraction',   icon: <Icon icon="mdi:fraction-one-half" className={ buttonSx } /> },
    { action: 'exponent',   icon: <Icon icon="mdi:exponent" className={ buttonSx } /> }
];