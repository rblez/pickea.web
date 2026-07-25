<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Términos y Condiciones — Pickea</title>
</svelte:head>

<section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
	<h1 class="text-3xl sm:text-4xl font-bold text-ink mb-10">Términos y Condiciones</h1>

	<div class="bg-card border border-hairline rounded-card p-6 sm:p-8 space-y-6 text-body leading-relaxed">
		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">1. Información general</h2>
			<p>
				Pickea es una plataforma de catálogo de servicios digitales operada por Pickea, con sede en Santiago de Cuba. Estos Términos y Condiciones regulan el uso de la plataforma y la compra de servicios digitales ofrecidos a través de ella.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">2. Servicios ofrecidos</h2>
			<p>
				Pickea ofrece la venta de servicios digitales que incluyen, entre otros: recargas, suscripciones a plataformas de streaming, licencias de software, tarjetas de regalo y otros productos digitales. Los servicios disponibles se muestran en el catálogo de la plataforma y están sujetos a disponibilidad.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">3. Precios y moneda</h2>
			<p>
				Todos los precios mostrados en la plataforma están expresados en Pesos Cubanos (CUP). Los precios pueden cambiar sin previo aviso. El precio válido es el que se muestra al momento de realizar el pedido.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">4. Proceso de compra</h2>
			<p>
				Para realizar una compra, el usuario debe completar el formulario de checkout con sus datos personales (nombre, apellidos y número de WhatsApp) y aceptar estos Términos y Condiciones. Una vez enviado el pedido, este será procesado y confirmado a través de WhatsApp.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">5. Forma de pago</h2>
			<p>
				El pago se realiza directamente a través de WhatsApp después de confirmar el pedido. Los métodos de pago disponibles serán comunicados por el equipo de Pickea durante el proceso de confirmación.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">6. Entrega de servicios</h2>
			<p>
				Los servicios digitales serán entregados una vez confirmado y procesado el pago. Los tiempos de entrega varían según el servicio adquirido y serán comunicados al cliente en el momento de la confirmación del pedido.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">7. Política de devoluciones</h2>
			<p>
				Debido a la naturaleza de los productos digitales, una vez entregado el servicio no se admiten devoluciones ni reembolsos, salvo en casos de error en la entrega por parte de Pickea. En caso de problemas con el servicio recibido, el cliente debe contactar a través de WhatsApp dentro de las 24 horas posteriores a la entrega.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">8. Uso de la plataforma</h2>
			<p>
				El usuario se compromete a utilizar la plataforma de forma lícita y de acuerdo con estos Términos y Condiciones. Queda prohibido el uso de la plataforma para fines fraudulentos o que contravengan la normativa vigente.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">9. Protección de datos</h2>
			<p>
				Los datos personales proporcionados por el usuario (nombre, apellidos y número de WhatsApp) serán utilizados exclusivamente para el procesamiento y entrega de los servicios solicitados. No se comparten con terceros ni se utilizan para fines de marketing sin el consentimiento del usuario.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">10. Limitación de responsabilidad</h2>
			<p>
				Pickea no se hace responsable por interrupciones del servicio, demoras en la entrega causadas por circunstancias ajenas a su control, ni por el uso indebido que el usuario pueda dar a los servicios adquiridos.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">11. Modificaciones</h2>
			<p>
				Pickea se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en la plataforma. Se recomienda revisar periódicamente esta página.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-ink mb-3">12. Contacto</h2>
			<p>
				Para consultas sobre estos Términos y Condiciones, el usuario puede contactar a Pickea a través de WhatsApp al <strong>+53 63807214</strong>.
			</p>
		</div>
	</div>

	<div class="mt-8 text-center">
		<a
			href={base + '/checkout'}
			class="inline-flex items-center gap-2 text-ember font-medium text-sm hover:text-ember-active transition-colors no-underline"
		>
			<i class="ri-arrow-left-line"></i>
			Volver al checkout
		</a>
	</div>
</section>