import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";

const withMutation = (WrappedComponent: any, mutation: DocumentNode) => {
    return (props: any) => {
        const [mutateFunction, { data, loading, error }] = useMutation(mutation);

        return (
            <WrappedComponent
                {...props}
                mutateFunction={mutateFunction}
                data={data}
                loading={loading}
                error={error}
            />
        );
    };
};

export default withMutation;