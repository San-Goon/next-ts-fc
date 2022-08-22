import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link';

interface Props {
    randomEmail: string;
}
const RandomEmail: NextPage<Props> = (props) => (
    <div>
        Hi {props.randomEmail}! <br />
        <Link href='/'>reset</Link>
    </div>
)

const exampleApi = (gender: 'male' | 'female') => fetch(`https://randomuser.me/api/?gender=${gender}`, {
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then((res) => res.results[0].email);

export const getServerSideProps: GetServerSideProps = async (props) => {
    const gender: string | string[] | undefined = props.query.gender;
    if (gender === "male" || gender === "female") {
        const randomEmail = await exampleApi(gender);
        return {
            props: { randomEmail },
        }
    }
    return {
        props: { randomEmail: "UNEXPECTED GENDER" }
    }
}

export default RandomEmail;
