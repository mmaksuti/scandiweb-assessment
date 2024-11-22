import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

const withQuery = (WrappedComponent: any, query: DocumentNode, variables = {}) => {
    return (props: any) => {
        const { data, loading, error } = useQuery(query, { variables });

        return (
            <WrappedComponent
            {...props}
            data={data}
            loading={loading}
            error={error}
            />
        );
    };
};

export default withQuery;