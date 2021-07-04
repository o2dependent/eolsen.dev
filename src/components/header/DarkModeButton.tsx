import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import styled from 'styled-components';

export const DarkModeButton = ({ isDarkMode, toggleDarkMode, maskKey }: { isDarkMode: boolean; toggleDarkMode: () => null; maskKey: string | number; }) => {
	// ---- hooks ----
	// spring
	const properties = {
		light: {
			r: 9,
			transform: "rotate(40deg)",
			cx: 12,
			cy: 4,
			opacity: 0
		},
		dark: {
			r: 5,
			transform: "rotate(90deg)",
			cx: 30,
			cy: 0,
			opacity: 1
		},
		springConfig: { mass: 4, tension: 250, friction: 35 }
	};
	const { r, transform, cx, cy, opacity } = properties[
		isDarkMode ? "light" : "dark"
	];

	const svgContainerProps = useSpring({
		transform,
		config: properties.springConfig
	});
	const centerCircleProps = useSpring({
		r,
		config: properties.springConfig
	});
	const maskedCircleProps = useSpring({
		cx, cy,
		config: properties.springConfig
	});
	const linesProps = useSpring({
		opacity,
		config: properties.springConfig
	});


	return (
		<DarkButton
			onClick={toggleDarkMode}
			title={(isDarkMode ? "Disable" : "Enable") + " dark mode"}
			aria-label={(isDarkMode ? "Disable" : "Enable") + " dark mode"}
		>
			<animated.svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				style={{
					cursor: "pointer",
					...svgContainerProps
				}}
			>
				<mask id={"mask" + maskKey}>
					<rect x="0" y="0" width="100%" height="100%" fill="white" />
					<animated.circle {...(maskedCircleProps)} r="9" fill="black" />
				</mask>
				<animated.circle fill='currentColor' cx="12" cy="12" {...(centerCircleProps)} mask={`url(#mask${maskKey})`} />
				<animated.g stroke="currentColor" style={linesProps}>
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</animated.g>
			</animated.svg>
		</DarkButton>
	);
};

// ---- styled components ----
const DarkButton = styled.button`
	user-select: none;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: transform 250ms ease;

  &:focus {
    outline: none;
  }

`;