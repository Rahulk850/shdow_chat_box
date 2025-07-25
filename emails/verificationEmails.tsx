import React from "react";
import {Html , Head , Font , Preview, Heading , Row , Section , Text , Button } from '@react-email/components'

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmails({username, otp}: VerificationEmailProps){
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
                <Font 
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
                    format:'woff2'
                }}
                fontWeight={400}
                fontStyle="normal"
                />
            </Head>
            <Preview>Here&apos;s your Verification code:{otp}</Preview>
            <Section>
             <Row>
                 <Heading as="h2">Welcome {username}</Heading>
                 <Text>Please enter the verification code below to complete your registration.</Text>
             </Row>
             <Row>
                <Text>{otp}</Text>
             </Row>
             <Row>
                <Text>
                    If you did not request this code , please ignore this mail
                </Text>
             </Row>
             
            </Section>
        </Html>
    )
}