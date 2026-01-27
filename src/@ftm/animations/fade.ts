import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    FtmAnimationCurves,
    FtmAnimationDurations,
} from '@ftm/animations/defaults';

// -----------------------------------------------------------------------------------------------------
// @ Fade in
// -----------------------------------------------------------------------------------------------------
const fadeIn = trigger('fadeIn', [
    state(
        'void',
        style({
            opacity: 0,
        })
    ),

    state(
        '*',
        style({
            opacity: 1,
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.entering} ${FtmAnimationCurves.deceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade in top
// -----------------------------------------------------------------------------------------------------
const fadeInTop = trigger('fadeInTop', [
    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(0, -100%, 0)',
        })
    ),

    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.entering} ${FtmAnimationCurves.deceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade in bottom
// -----------------------------------------------------------------------------------------------------
const fadeInBottom = trigger('fadeInBottom', [
    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)',
        })
    ),

    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.entering} ${FtmAnimationCurves.deceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade in left
// -----------------------------------------------------------------------------------------------------
const fadeInLeft = trigger('fadeInLeft', [
    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0)',
        })
    ),

    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.entering} ${FtmAnimationCurves.deceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade in right
// -----------------------------------------------------------------------------------------------------
const fadeInRight = trigger('fadeInRight', [
    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)',
        })
    ),

    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.entering} ${FtmAnimationCurves.deceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade out
// -----------------------------------------------------------------------------------------------------
const fadeOut = trigger('fadeOut', [
    state(
        '*',
        style({
            opacity: 1,
        })
    ),

    state(
        'void',
        style({
            opacity: 0,
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.exiting} ${FtmAnimationCurves.acceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade out top
// -----------------------------------------------------------------------------------------------------
const fadeOutTop = trigger('fadeOutTop', [
    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(0, -100%, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.exiting} ${FtmAnimationCurves.acceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade out bottom
// -----------------------------------------------------------------------------------------------------
const fadeOutBottom = trigger('fadeOutBottom', [
    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.exiting} ${FtmAnimationCurves.acceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade out left
// -----------------------------------------------------------------------------------------------------
const fadeOutLeft = trigger('fadeOutLeft', [
    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.exiting} ${FtmAnimationCurves.acceleration}`,
        },
    }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade out right
// -----------------------------------------------------------------------------------------------------
const fadeOutRight = trigger('fadeOutRight', [
    state(
        '*',
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
        })
    ),

    state(
        'void',
        style({
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)',
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FtmAnimationDurations.exiting} ${FtmAnimationCurves.acceleration}`,
        },
    }),
]);

export {
    fadeIn,
    fadeInBottom,
    fadeInLeft,
    fadeInRight,
    fadeInTop,
    fadeOut,
    fadeOutBottom,
    fadeOutLeft,
    fadeOutRight,
    fadeOutTop,
};
