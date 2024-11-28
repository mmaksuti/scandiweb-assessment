import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useParams } from "react-router-dom";

const withQueryAndParam = (WrappedComponent: any, query: DocumentNode) => {
    return (props: any) => {
        const params = useParams();
        const { data, loading, error } = useQuery(query, { 'variables': params });

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

export default withQueryAndParam;