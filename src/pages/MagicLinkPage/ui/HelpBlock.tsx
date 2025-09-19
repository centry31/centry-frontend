type Props = {
	minimal?: boolean;
};

export const HelpBlock = (props: Props) => {
	const { minimal } = props;

	return (
		<div className="text-xs leading-relaxed text-neutral-500">
			<div className="font-medium text-neutral-600 mb-1">Как это работает</div>

			<ol className="list-decimal pl-4 space-y-1">
				<li>Мы отправляем одноразовую ссылку на ваш Telegram.</li>
				<li>Вы открываете ссылку на этом устройстве — мы подтверждаем код.</li>
				<li>Создаём сессию и перенаправляем вас в приложение.</li>
			</ol>

			{!minimal && (
				<div className="mt-2">
					Подсказка: если ссылка открылась в другом браузере — скопируйте её и вставьте в
					этот.
				</div>
			)}
		</div>
	);
};
