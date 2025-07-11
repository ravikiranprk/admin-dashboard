import EditUserForm from "@/components/EditUserForm";

const getUserById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
            cache: "no-store",
        });

        if(!res.ok){
            throw new Error("Failed to fetch the user.");
        }

        return res.json();
    } catch(error) {
        console.log(error);
    }
}

export default async function Page({ params }) {
    const { id } = await params;
    // console.log(id);
    const user = await getUserById(id);
    const { name, age, email, address, approvalStatus } = user.message.user;
    console.log(name);

    return <EditUserForm id={id} name={name} age={age} email={email} address={address} approvalStatus={approvalStatus} />
}