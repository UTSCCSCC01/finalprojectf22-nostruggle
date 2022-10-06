import openApi from '../openApi/openapi.json' assert {type: 'json'};

export const getOpenApi = async (req, res) => {
    try {
        res.status(200).json(openApi);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
};