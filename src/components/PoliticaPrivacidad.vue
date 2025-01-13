<template>
    <h1>Politica Privacidad</h1>

    <div class="container policy-container">
        <!-- Encabezado de la Política -->
        <div class="policy-header">
            <h1>Política de Privacidad de MiEmpresa</h1>
        </div>

        <!-- Sección de la política -->
        <div class="policy-content">
            <div class="policy-section">
                <h3>1. Información que recopilamos</h3>
                <p>Recopilamos los siguientes tipos de información:</p>
                <ul>
                    <li><strong>Información personal identificable:</strong> Como nombre, dirección de correo electrónico, número de teléfono, dirección postal y cualquier otra información que el usuario nos proporcione al registrarse en nuestro sitio o al interactuar con nuestros servicios.</li>
                    <li><strong>Información no personal:</strong> Datos como el tipo de navegador, la dirección IP, el sistema operativo y la fecha y hora de acceso, que se recopilan automáticamente cuando accedes a nuestro sitio web.</li>
                </ul>
            </div>

            <div class="policy-section">
                <h3>2. Uso de la información</h3>
                <p>La información recopilada se utiliza para los siguientes fines:</p>
                <ul>
                    <li>Proporcionar y personalizar nuestros servicios.</li>
                    <li>Responder a consultas o comentarios que nos envíes.</li>
                    <li>Enviar comunicaciones sobre productos, servicios o promociones que puedan interesarte.</li>
                    <li>Mejorar el contenido y la funcionalidad de nuestro sitio web.</li>
                    <li>Cumplir con nuestras obligaciones legales.</li>
                </ul>
            </div>

            <div class="policy-section">
                <h3>3. Cookies</h3>
                <p>Nuestro sitio web utiliza <strong>cookies</strong> para mejorar la experiencia del usuario. Las cookies son pequeños archivos almacenados en tu dispositivo que nos permiten reconocer tu navegador y recopilar información sobre tu visita.</p>
                <p>Puedes configurar tu navegador para rechazar las cookies o para que te avise cuando se envíen. Sin embargo, si decides deshabilitar las cookies, algunas partes del sitio podrían no funcionar correctamente.</p>
            </div>

            <div class="policy-section">
                <h3>4. Seguridad de la información</h3>
                <p>Implementamos medidas de seguridad razonables para proteger tu información personal contra el acceso no autorizado, la alteración, divulgación o destrucción. Sin embargo, ninguna transmisión de datos por internet es completamente segura, por lo que no podemos garantizar una seguridad absoluta.</p>
            </div>

            <div class="policy-section">
                <h3>5. Compartir información con terceros</h3>
                <p>No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:</p>
                <ul>
                    <li>Con proveedores de servicios que nos ayudan a operar el sitio web, siempre y cuando ellos acepten mantener la confidencialidad de la información.</li>
                    <li>Si es necesario para cumplir con la ley, para proteger nuestros derechos o para responder a un proceso legal.</li>
                </ul>
            </div>

            <div class="policy-section">
                <h3>6. Derechos de los usuarios</h3>
                <p>Dependiendo de tu lugar de residencia, puedes tener ciertos derechos relacionados con tus datos personales, como:</p>
                <ul>
                    <li><strong>Acceder a tu información personal.</strong></li>
                    <li><strong>Corregir o actualizar información incorrecta.</strong></li>
                    <li><strong>Solicitar la eliminación de tus datos personales.</strong></li>
                    <li><strong>Oponerte al tratamiento de tus datos.</strong></li>
                </ul>
                <p>Si deseas ejercer alguno de estos derechos, puedes contactarnos a través de la información de contacto proporcionada al final de esta política.</p>
            </div>

            <div class="policy-section">
                <h3>7. Enlaces a sitios externos</h3>
                <p>Nuestro sitio web puede contener enlaces a otros sitios de internet. No somos responsables de las prácticas de privacidad de estos sitios y te recomendamos leer sus políticas de privacidad.</p>
            </div>

            <div class="policy-section">
                <h3>8. Cambios en la Política de Privacidad</h3>
                <p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Las modificaciones serán publicadas en esta página con la fecha de actualización. Te sugerimos revisar esta política periódicamente para estar al tanto de cómo estamos protegiendo tu información.</p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "politicaPrivacidad",
        components: {}
    }
</script>

<style scoped>
 .policy-container {
            margin-top: 50px;
            margin-bottom: 50px;
        }
        .policy-header {
            text-align: center;
            margin-bottom: 30px;
            font-weight: bold;
        }
        .policy-content {
            font-size: 1.1rem;
            line-height: 1.8;
        }
        .policy-section {
            margin-bottom: 30px;
        }
</style>
